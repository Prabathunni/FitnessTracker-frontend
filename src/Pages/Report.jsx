import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { CircularProgress, Typography, Box } from '@mui/material';
import { BarPlot, ChartContainer, ChartsTooltip, ChartsXAxis, ChartsYAxis } from '@mui/x-charts'
import styles from './ReportPage.module.css'
import UpdatePopUp from '../Components/UpdatePopUp'
import { useAuth } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { getAllReportAPI, getCalorieByDateAPI, getCalorieByLimitAPI, getSleepByDateAPI, getSleepByLimitAPI, getWaterByDateAPI, getWaterByLimitAPI, getWeightByDateAPI, getWeightByLimitAPI } from '../services/userServices'
import { toast, ToastContainer } from 'react-toastify';

function Report() {

  const { showUpdatePopUp, setShowUpdatePopUp } = useAuth()
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for changing values based on paramaters or url based on report 
  const [checkReportName, setCheckReportName] = useState()
  const { dataName } = useParams()

  const [dateForAnalyze, setDateForAnalyze] = useState()

  // CHARTDATA----CALORIE
  const [dataS1, setDataS1] = useState() //---------------for limit data
  const [dataS2, setDataS2] = useState() //----------------for date data
  // CHARTDATA----SLEEP
  const [dataSleepChart, setDataSleepChart] = useState()
  const [dataSleepChartS2, setDataSleepChartS2] = useState()
  //CHARTDATA---WATER
  const [dataWaterChart, setDataWaterChart] = useState()
  const [dataWaterChartS2, setDataWaterChartS2] = useState()
  //CHARTDATA---WEIGHT
  const [dataWeightChart, setDataWeightChart] = useState()
  const [dataWeightChartS2, setDataWeightChartS2] = useState()


  // TOdays value and Goal Value Graph valuess
  const [goalTrack, setGoalTrack] = useState(0);
  const [todaysReport, setTodaysReport] = useState(0);
  const [goalUnit, setGoalUnit] = useState(0);
  const [todaysUnit, setTodaysUnit] = useState(0);


  // Todays and Target###############3
  const getAllReport = async () => {
    try {
      const result = await getAllReportAPI()
      const reportData = result.data.response;
      console.log(reportData);

      if (dataName === 'CALORIE INTAKE') {

        setGoalTrack(reportData[0]?.goal || 0);
        setTodaysReport(reportData[0]?.value || 0);
        setGoalUnit(reportData[0]?.goalUnit || 0)
        setTodaysUnit(reportData[0]?.unit || 0)

      } else if (dataName === 'SLEEP') {
        setGoalTrack(reportData[1]?.goal || 0);
        setTodaysReport(reportData[1]?.value || 0);
        setGoalUnit(reportData[1]?.goalUnit || 0)
        setTodaysUnit(reportData[1]?.unit || 0)


      } else if (dataName === 'WATER INTAKE') {
        setGoalTrack(reportData[2]?.goal || 0);
        setTodaysReport(reportData[2]?.value || 0);
        setGoalUnit(reportData[2]?.goalUnit || 0)
        setTodaysUnit(reportData[2]?.unit || 0)


      } else if (dataName === 'WEIGHT') {
        setGoalTrack(reportData[3]?.goal || 0);
        setTodaysReport(reportData[3]?.value || 0);
        setGoalUnit(reportData[3]?.goalUnit || 0)
        setTodaysUnit(reportData[3]?.unit || 0)

      } else {
        setGoalTrack(0);
        setTodaysReport(0);
        setGoalUnit(0)
        setTodaysUnit(0)

      }


    } catch (error) {
      console.log(error.response.data.error);

    }
  }

  // _________________________________________________CALORIE FUNCTIONS___________
  // need to fix graph values################3
  const getCalorieByDate = async (e) => {

    e.preventDefault()

    try {

      if (dateForAnalyze) {
        const neededDate = new Date(dateForAnalyze)
        const jsonDate = neededDate.toJSON()
        // console.log(neededDate);
        // console.log(jsonDate);

        const result = await getCalorieByDateAPI(jsonDate)
        // console.log(result.data.response);                 //------------------bug found giving undefined at first**fixed!!!!
        const warningMessage = result.data.response
        warningMessage && toast.success(warningMessage)

        const caloriesDataArr = result.data

        if (caloriesDataArr.length > 0) {

          // console.log(caloriesDataArr);
          const graphData = caloriesDataArr.map((item) => ({
            food: String(item.item),
            calories: Number(item.calorieInTake),
            protein: String(item.proteinInTake)
          }))
          // console.log(graphData);
          // {item: 'appam', calories: 300}
          setDataS2(graphData)

        }

        setDateForAnalyze()
        setShow(false)


      } else {
        toast.warning("Provide Date for Analyze")
        setShow(false)

      }

    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        toast.error(error.response.data.response)
      }

      setShow(false)
      setDateForAnalyze()
    }
  }

  // GRaph bug fixed!!
  const getCalorieByLimit = async (limit) => {

    try {
      // console.log(limit);
      if (limit) {
        const result = await getCalorieByLimitAPI({ limit })
        const caloriesDataArr = result.data

        if (caloriesDataArr) {

          const dataSet = caloriesDataArr.map((item) => {
            const d = new Date(item.date);
            const month = d.toLocaleString('default', { month: 'short' })
            const day = d.getDate();
            return {
              label: `${month} ${day}`,
              month,
              day,
              intake: item.quantity
            }
          })
          // dataSet ==>
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 100}
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 100}
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 1000}
          // {label: 'Jun 22', month: 'Jun', day: 22, intake: 200}
          // {label: 'Jun 22', month: 'Jun', day: 22, intake: 200}
          // {label: 'Jun 30', month: 'Jun', day: 30, intake: 100}
          // {label: 'Jun 30', month: 'Jun', day: 30, intake: 50}
          // {label: 'Jul 1', month: 'Jul', day: 1, intake: 200}

          const group = {}

          dataSet.forEach((item) => {
            const { label, month, day, intake } = item
            if (!group[label]) {
              group[label] = { label, month, day, intake: Number(intake) }
            } else {
              group[label].intake += Number(intake)
            }
          })

          const groupedData = Object.values(group)
          // console.log(groupedData);

          setDataS1(groupedData)
        } 
        handleClose()
      }
    } catch (error) {
        toast.error(error.response.data.response)
        handleClose()

    }

  }


  // _________________________________________________SLEEP FUNCTIONS___________


  const getSleepByDate = async (e) => {
    e.preventDefault()

    try {
      if (dateForAnalyze) {
        const neededDate = new Date(dateForAnalyze)
        const jsonDate = neededDate.toJSON()
        // console.log(neededDate);
        // console.log(jsonDate);

        const result = await getSleepByDateAPI(jsonDate)
        // console.log(result);         

        const sleepDataArray = result.data.response
        console.log(sleepDataArray);

        if (sleepDataArray.length > 0) {

          // {date: '2025-07-02T00:00:00.000Z', durationInHr: 9, _id: '68658ac91d428e8a6b35885b'}

          const graphData = sleepDataArray.map((item) => ({
            label: item.date,
            sleeptHrs: Number(item.durationInHr)
          }))
          console.log(graphData);
          setDataSleepChart(graphData)

        }
        setDateForAnalyze()
        setShow(false)

      } else {
        toast.warning("Provide Date for Analyze")
        setShow(false)

      }


    } catch (error) {
      // console.log(error);
      setShow(false)
      setDateForAnalyze()

      if (error.response.status === 404) {
        toast.error(error.response.data.response)
      }


    }

  }


  const getSleepByLimit = async (limit) => {

    try {
      if (limit) {
        const result = await getSleepByLimitAPI({ limit })
        const sleepDataArray = result.data
        // console.log(sleepDataArray);
        // { date: '2025-06-28T09:00:00.000Z', durationInHr: 7, _id: '6861313bb8481096ddb4dd03' }
        // { date: '2025-06-01T09:00:00.000Z', durationInHr: 7, _id: '6863cc12a5de80c9a6a799fd' }
        // { date: '2025-06-03T09:00:00.000Z', durationInHr: 6, _id: '6863cc2ca5de80c9a6a79a06' }

        if (sleepDataArray) {

          const dataSet = sleepDataArray.map((item) => {
            const d = new Date(item.date);
            const month = d.toLocaleString('default', { month: 'short' })
            const day = d.getDate();
            return {
              label: `${month} ${day}`,
              month,
              day,
              sleeptHrs: Number(item.durationInHr)
            }
          })
          // dataSet ==>
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 100}
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 100}
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 1000}
          // {label: 'Jun 22', month: 'Jun', day: 22, intake: 200}
          // {label: 'Jun 22', month: 'Jun', day: 22, intake: 200}
          // {label: 'Jun 30', month: 'Jun', day: 30, intake: 100}
          // {label: 'Jun 30', month: 'Jun', day: 30, intake: 50}
          // {label: 'Jul 1', month: 'Jul', day: 1, intake: 200}

          const group = {}

          dataSet.forEach((item) => {
            const { label, month, day, sleeptHrs } = item
            if (!group[label]) {
              group[label] = { label, month, day, sleeptHrs: Number(item.sleeptHrs) }
            } else {
              group[label].sleeptHrs += Number(sleeptHrs)
            }
          })

          const groupedData = Object.values(group)
          // console.log(groupedData);
          setDataSleepChartS2(groupedData)

        } else {
          toast.warning("No Records Found!")
        }

        handleClose()
      }

      // Bugg found toast not closing **************
    } catch (error) {
      toast.error(error.response.data.response)
      handleClose()

    }

  }


  // _________________________________________________-WATER FUNCITONS_____________

  const getWaterIntakeByLimit = async (limit) => {
    try {

      if (limit) {
        const result = await getWaterByLimitAPI({ limit })
        const waterDataArray = result.data.response
        // console.log(waterDataArray);

        // { date: '2025-06-25T15:46:30.123Z', waterTakenInMl: 2000, _id: '686132cfab9357b131847d41' }
        // { date: '2025-06-28T15:46:30.123Z', waterTakenInMl: 2000, _id: '68613324cd8982464c10fbbf' }
        // { date: '2025-07-01T00:00:00.000Z', waterTakenInMl: 1, _id: '68659f5dbd4cb74b7185f1d1' }

        if (waterDataArray) {

          const dataSet = waterDataArray.map((item) => {
            const d = new Date(item.date);
            const month = d.toLocaleString('default', { month: 'short' })
            const day = d.getDate();
            return {
              label: `${month} ${day}`,
              month,
              day,
              waterTakenInMl: Number(item.waterTakenInMl)
            }
          })

          // dataSet ==>
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 100}
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 100}
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 1000}
          // {label: 'Jun 22', month: 'Jun', day: 22, intake: 200}
          // {label: 'Jun 22', month: 'Jun', day: 22, intake: 200}
          // {label: 'Jun 30', month: 'Jun', day: 30, intake: 100}
          // {label: 'Jun 30', month: 'Jun', day: 30, intake: 50}
          // {label: 'Jul 1', month: 'Jul', day: 1, intake: 200}

          const group = {}

          dataSet.forEach((item) => {
            const { label, month, day, waterTakenInMl } = item
            if (!group[label]) {
              group[label] = { label, month, day, waterTakenInMl: Number(item.waterTakenInMl) }
            } else {
              group[label].waterTakenInMl += Number(waterTakenInMl)
            }
          })

          const groupedData = Object.values(group)
          // console.log(groupedData);
          setDataWaterChart(groupedData)

        } else {
          toast.warning("No Records Found!")
        }

        handleClose()
      }

    } catch (error) {
      toast.error(error.response.data.response || "Something went wrong")
      handleClose()
    }
  }


  const getWaterByDate = async (e) => {
    e.preventDefault()

    try {
      if (dateForAnalyze) {
        const neededDate = new Date(dateForAnalyze)
        const jsonDate = neededDate.toJSON()
        // console.log(neededDate);
        // console.log(jsonDate);

        const result = await getWaterByDateAPI(jsonDate)
        // console.log(result);         
        const waterDataArray = result.data.response
        // console.log(waterDataArray);

        if (waterDataArray.length > 0) {

          // { date: '2025-06-25T15:46:30.123Z', waterTakenInMl: 2000, _id: '686132cfab9357b131847d41' }

          const graphData = waterDataArray.map((item) => ({
            label: item.date,
            waterTakenInMl: Number(item.waterTakenInMl)
          }))
          // console.log(graphData);
          setDataWaterChartS2(graphData)

        }

        setDateForAnalyze()
        setShow(false)


      } else {
        toast.warning("Provide Date for Analyze")
        setShow(false)

      }


    } catch (error) {
      // console.log(error);
      if (error.response.status === 404) {
        toast.error(error.response.data.response)
      }

      setShow(false)
      setDateForAnalyze()


    }

  }


  // __________________________________________________WEIGHT FUNCTIONS-----------------

  const getWeightByLimit = async (limit) => {
    try {

      if (limit) {
        const result = await getWeightByLimitAPI({ limit })
        const weightDataArray = result.data.response
        // console.log(weightDataArray);
        // {weight: 65, date: '2025-06-29T10:44:55.651Z', _id: '686119277b0f17901c24dc88'}

        if (weightDataArray) {

          const dataSet = weightDataArray.map((item) => {
            const d = new Date(item.date);
            const month = d.toLocaleString('default', { month: 'short' })
            const day = d.getDate();
            return {
              label: `${month} ${day}`,
              month,
              day,
              weight: Number(item.weight)
            }
          })

          // dataSet ==>
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 100}
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 100}
          // {label: 'Jun 27', month: 'Jun', day: 27, intake: 1000}

          const group = {}

          dataSet.forEach((item) => {
            const { label, month, day, weight } = item
            if (!group[label]) {
              group[label] = { label, month, day, weight: Number(item.weight) }
            } else {
              group[label].weight = Number(weight)
            }
          })

          const groupedData = Object.values(group)
          console.log(groupedData);
          setDataWeightChart(groupedData)

        } else {
          toast.warning("No Records Found!")
        }

        handleClose()
      }

    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        toast.error(error.response.data.response)
      }
      handleClose()
    }


  }


  const getWeightByDate = async (e) => {
    e.preventDefault()

    try {
      if (dateForAnalyze) {
        const neededDate = new Date(dateForAnalyze)
        const jsonDate = neededDate.toJSON()
        // console.log(neededDate);
        // console.log(jsonDate);

        const result = await getWeightByDateAPI(jsonDate)
        // console.log(result);         
        const weightDataArray = result.data.response
        // console.log(weightDataArray);

        if (weightDataArray.length > 0) {

          // {weight: 66, date: '2025-07-01T00:00:00.000Z', _id: '6865aacfbae612b55e39569a'}
          const graphData = weightDataArray.map((item) => ({
            label: item.date,
            weight: Number(item.weight)
          }))
          // console.log(graphData);
          setDataWeightChartS2(graphData)

        }

        setDateForAnalyze()
        setShow(false)


      } else {
        toast.warning("Provide Date for Analyze")
        setShow(false)

      }


    } catch (error) {
      console.log(error);
      setShow(false)
      setDateForAnalyze()
      if (error.response.status === 404) {
        toast.error(error.response.data.response)
      }
    }
  }



  useEffect(() => {
    getCheckReportName()
    getAllReport()

  }, [])


  const getCheckReportName = () => {
    setCheckReportName(dataName)
  }

  const colorPalette = ['#66bb6a', '#ff7043', '#42a5f5', '#ab47bc']; // Orange, Blue, Green, Purple
  const percentage = Math.min(100, Math.round((todaysReport / goalTrack) * 100));

  return (
    <div className={`${styles.reportSection}`}>
      <Header />

      <div className='px-5 d-flex gap-3'>
        <p className='bg-warning p-1 rounded shadow-sm px-2'>Today: {todaysReport} {todaysUnit}</p>
        <p className='bg-primary text-light p-1 rounded shadow-sm px-2'>Goal : {goalTrack} {goalUnit}</p>

      </div>


      <div className='container d-flex flex-column flex-md-row gap-5 flex-wrap justify-content-center align-items-center' style={{ marginTop: "60px" }}>

        <div className='section1  d-flex justify-content-center align-items-center'>

          <div>

            <h3 className='text-center'>Todays Target </h3>


            <ChartContainer
              width={500}
              height={150}
              layout="horizontal"
              dataset={[
                { label: "Today", value: todaysReport },
                { label: "Goal", value: goalTrack },
              ]}
              series={[
                {
                  type: 'bar',
                  dataKey: 'value',
                  label: '',
                  yAxisKey: 'labelAxis',
                  layout: 'horizontal',
                },
              ]}
              xAxis={[{
                scaleType: 'linear',
                label: 'TARGET',
              }]}
              yAxis={[{
                id: 'labelAxis',
                dataKey: 'label',
                scaleType: 'band',
                label: '',
              }]}
            >
              <BarPlot />
              <ChartsXAxis />
              <ChartsYAxis />
              <ChartsTooltip />
            </ChartContainer>



            {/* percentage goal  */}
            <Box position="relative" display="inline-flex" mt={2}>
              <CircularProgress
                variant="determinate"
                value={percentage}
                size={160}
                thickness={8}
                color={percentage >= 100 ? 'error' : 'primary'}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="" component="div" color="textSecondary">
                  {percentage}%
                </Typography>
              </Box>
            </Box>


          </div>

        </div>


        <div className='section2 d-flex justify-content-center align-items-center'>

          {dataS1 && <h3 className='text-center'>Analyze Report</h3>}
          {dataSleepChartS2 && <h3 className='text-center'>Analyze Report</h3>}
          {dataWaterChart && <h3 className='text-center'>Analyze Report</h3>}
          {dataWeightChart && <h3 className='text-center'>Analyze Report</h3>}


          {/* CALORIE ----------bY LIMIT--------------------------- */}
          {
            dataS1 &&
            <ChartContainer
              height={400}
              dataset={dataS1}
              colors={colorPalette}

              series={[
                {
                  type: 'bar',
                  dataKey: 'intake',
                  label: 'Calorie Intake',
                },
              ]}
              xAxis={[{
                id: 'label',
                dataKey: 'label',
                scaleType: 'band',
                label: 'Day',
              }]}
              yAxis={[{
                label: 'Calories',
              }]}
            >
              <BarPlot />
              <ChartsXAxis />
              <ChartsYAxis />
              <ChartsTooltip />
            </ChartContainer>
          }

          {/* SLEEP ----------bY LIMIT--------------------------- */}

          {
            dataSleepChartS2 &&
            <ChartContainer
              height={400}
              dataset={dataSleepChartS2}
              colors={colorPalette}

              series={[
                {
                  type: 'bar',
                  dataKey: 'sleeptHrs',
                  label: 'Hours Slept',
                },
              ]}
              xAxis={[{
                id: 'label',
                dataKey: 'label',
                scaleType: 'band',
                label: 'Day',
              }]}
              yAxis={[{
                label: 'Sleep in Hrs',
              }]}
            >
              <BarPlot />
              <ChartsXAxis />
              <ChartsYAxis />
              <ChartsTooltip />
            </ChartContainer>
          }


          {/* WATER ----------bY LIMIT--------------------------- */}
          {
            dataWaterChart &&
            <ChartContainer
              height={400}
              dataset={dataWaterChart}
              colors={colorPalette}

              series={[
                {
                  type: 'bar',
                  dataKey: 'waterTakenInMl',
                  label: 'Water Taken In ML',
                },
              ]}
              xAxis={[{
                id: 'label',
                dataKey: 'label',
                scaleType: 'band',
                label: 'Day',
              }]}
              yAxis={[{
                label: 'Watertaken In ML',
              }]}
            >
              <BarPlot />
              <ChartsXAxis />
              <ChartsYAxis />
              <ChartsTooltip />
            </ChartContainer>
          }


          {/* Weight ----------bY LIMIT--------------------------- */}
          {
            dataWeightChart &&
            <ChartContainer
              height={400}
              dataset={dataWeightChart}
              colors={colorPalette}

              series={[
                {
                  type: 'bar',
                  dataKey: 'weight',
                  label: 'Weight in Kg',
                },
              ]}
              xAxis={[{
                id: 'label',
                dataKey: 'label',
                scaleType: 'band',
                label: 'Day',
              }]}
              yAxis={[{
                label: 'Weight in Kg',
              }]}
            >
              <BarPlot />
              <ChartsXAxis />
              <ChartsYAxis />
              <ChartsTooltip />
            </ChartContainer>
          }


        </div>


        <div className='section3 d-flex justify-content-center align-items-center'>

          {dataS2 && <h3 className='text-center'>Date Analyze Report</h3>}
          {dataSleepChart && <h3 className='text-center'>Date Analyze Report</h3>}
          {dataSleepChartS2 && <h3 className='text-center'>Date Analyze Report</h3>}

          {/* FOR CALORIE -----------------BY DATE */}
          {
            dataS2 &&
            <ChartContainer
              width={600}
              height={300}
              layout="horizontal"
              dataset={dataS2}
              series={[
                {
                  type: 'bar',
                  dataKey: 'calories',
                  label: 'Calories',
                  yAxisKey: 'foodAxis',
                  layout: 'horizontal',
                  // color: '#42a5f5', // blue
                },
                {
                  type: 'bar',
                  dataKey: 'protein',
                  label: 'Protein',
                  yAxisKey: 'foodAxis',
                  layout: 'horizontal',
                  // color: '#66bb6a', // green
                },
              ]}
              xAxis={[
                {
                  scaleType: 'linear',
                  label: 'Calories / Protein (g)',
                },
              ]}
              yAxis={[
                {
                  id: 'foodAxis',
                  dataKey: 'food',
                  scaleType: 'band',
                },
              ]}
            >
              <BarPlot />
              <ChartsXAxis />
              <ChartsYAxis />
              <ChartsTooltip />
            </ChartContainer>

          }

          {/* For Sleep by date---------------------- */}
          {
            dataSleepChart &&
            <ChartContainer
              width={500}
              height={120}
              layout="horizontal"
              dataset={dataSleepChart}
              series={[
                {
                  type: 'bar',
                  dataKey: 'sleeptHrs',
                  label: 'Hours Slept',
                  yAxisKey: 'labelAxis',
                  layout: 'horizontal',
                  color: '#42a5f5',
                },
              ]}
              xAxis={[
                {
                  scaleType: 'linear',
                  label: 'Hours Slept',
                  min: 0,
                  max: 10, // Adjust based on expected range
                },
              ]}
              yAxis={[
                {
                  id: 'labelAxis',
                  dataKey: 'label',
                  scaleType: 'band',
                },
              ]}
            >
              <BarPlot />
              <ChartsXAxis />
              <ChartsYAxis />
              <ChartsTooltip />
            </ChartContainer>

          }

          {/* For Water by date---------------------- */}
          {
            dataWaterChartS2 &&
            <ChartContainer
              width={500}
              height={120}
              layout="horizontal"
              dataset={dataWaterChartS2}
              series={[
                {
                  type: 'bar',
                  dataKey: 'waterTakenInMl',
                  label: 'Watertaken in ML',
                  yAxisKey: 'labelAxis',
                  layout: 'horizontal',
                  color: '#42a5f5',
                },
              ]}
              xAxis={[
                {
                  scaleType: 'linear',
                  label: 'Water Intake',
                  // min: 0,
                  // max: 3000, // Adjust based on expected range
                },
              ]}
              yAxis={[
                {
                  id: 'labelAxis',
                  dataKey: 'label',
                  scaleType: 'band',
                },
              ]}
            >
              <BarPlot />
              <ChartsXAxis />
              <ChartsYAxis />
              <ChartsTooltip />
            </ChartContainer>

          }

          {/* For Weight by date---------------------- */}
          {
            dataWeightChartS2 &&
            <ChartContainer
              width={500}
              height={120}
              layout="horizontal"
              dataset={dataWeightChartS2}
              series={[
                {
                  type: 'bar',
                  dataKey: 'weight',
                  label: 'Weight in Kg',
                  yAxisKey: 'labelAxis',
                  layout: 'horizontal',
                  color: '#42a5f5',
                },
              ]}
              xAxis={[
                {
                  scaleType: 'linear',
                  label: 'Weight',
                  // min: 0,
                  // max: 3000, // Adjust based on expected range
                },
              ]}
              yAxis={[
                {
                  id: 'labelAxis',
                  dataKey: 'label',
                  scaleType: 'band',
                },
              ]}
            >
              <BarPlot />
              <ChartsXAxis />
              <ChartsYAxis />
              <ChartsTooltip />
            </ChartContainer>

          }

        </div>


      </div>




      <div className='d-flex flex-column gap-4 position-fixed bottom-0 end-0 m-5'>

        <button className="btn btn-warning" onClick={() => setShowUpdatePopUp(true)}>
          <span className='d-none d-md-inline me-2'>Update Report</span><i class="fa-solid fa-file-pen"></i>
        </button>

        <button className="btn btn-primary" onClick={handleShow}>
          <span className='d-none d-md-inline me-2'>Analyze</span><i class="fa-solid fa-magnifying-glass-chart"></i>
        </button>

      </div>


      {
        showUpdatePopUp && <UpdatePopUp reportName={checkReportName} onUpdateSuccess={getAllReport} />
      }


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='md'
      >
        <Modal.Body>

          <h5 className='text-center mb-2'>Analyse</h5>

          <div >
            <FloatingLabel
              controlId="floatingInput"
              label="Analyze By Date"
              className="mb-3"
            >
              <Form.Control type="date" onChange={e => setDateForAnalyze(e.target.value)} placeholder="Recorded Date" />
            </FloatingLabel>

            <div
              className="d-flex gap-3"
              style={{ height: "40px" }}
            >
              {
                dataName === "CALORIE INTAKE" && <>
                  <button onClick={() => getCalorieByLimit("all")} className="btn btn-outline-primary">All</button>
                  <button onClick={() => getCalorieByLimit("last7days")} className="btn btn-outline-primary">Last 7 Days</button>
                  <button onClick={() => getCalorieByLimit("last10days")} className="btn btn-outline-primary">Last 10 Days</button>
                </>
              }
              {
                dataName === "SLEEP" && <>
                  <button onClick={() => getSleepByLimit("all")} className="btn btn-outline-primary">All</button>
                  <button onClick={() => getSleepByLimit("last7days")} className="btn btn-outline-primary">Last 7 Days</button>
                  <button onClick={() => getSleepByLimit("last10days")} className="btn btn-outline-primary">Last 10 Days</button>
                </>
              }
              {
                dataName === "WATER INTAKE" && <>
                  <button onClick={() => getWaterIntakeByLimit("all")} className="btn btn-outline-primary">All</button>
                  <button onClick={() => getWaterIntakeByLimit("last7days")} className="btn btn-outline-primary">Last 7 Days</button>
                  <button onClick={() => getWaterIntakeByLimit("last10days")} className="btn btn-outline-primary">Last 10 Days</button>
                </>
              }
              {
                dataName === "WEIGHT" && <>
                  <button onClick={() => getWeightByLimit("all")} className="btn btn-outline-primary">All</button>
                  <button onClick={() => getWeightByLimit("last7days")} className="btn btn-outline-primary">Last 7 Days</button>
                  <button onClick={() => getWeightByLimit("last10days")} className="btn btn-outline-primary">Last 10 Days</button>
                </>
              }

            </div>




          </div>

          <div className='d-flex justify-content-center gap-2 mt-5'>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {
              dataName === "CALORIE INTAKE" && <Button variant="primary" onClick={getCalorieByDate}>Analyse</Button>
            }
            {
              dataName === "SLEEP" && <Button variant="primary" onClick={getSleepByDate}>Analyse</Button>
            }
            {
              dataName === "WATER INTAKE" && <Button variant="primary" onClick={getWaterByDate}>Analyse</Button>
            }
            {
              dataName === "WEIGHT" && <Button variant="primary" onClick={getWeightByDate}>Analyse</Button>
            }



          </div>


        </Modal.Body>
      </Modal>


    </div>
  )
}

export default Report