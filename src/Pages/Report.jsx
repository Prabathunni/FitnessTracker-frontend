import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { CircularProgress, Typography, Box } from '@mui/material';
import { BarChart, BarPlot, ChartContainer, ChartsTooltip, ChartsXAxis, ChartsYAxis } from '@mui/x-charts'
import styles from './ReportPage.module.css'
import UpdatePopUp from '../Components/UpdatePopUp'
import { useAuth } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { getAllReportAPI, getCalorieByDateAPI, getCalorieByLimitAPI } from '../services/userServices'

function Report() {

  const { showUpdatePopUp, setShowUpdatePopUp } = useAuth()
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for changing values based on paramaters or url based on report 
  const [checkReportName, setCheckReportName] = useState()
  const { dataName } = useParams()


  const [dataS1, setDataS1] = useState() //---------------for calorie limit data
  const [dataS2, setDataS2] = useState() //----------------for calorie date data
  const [dateForCalAnalyze, setDateForCalAnalyze] = useState()

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

      if (dateForCalAnalyze) {
        const neededDate = new Date(dateForCalAnalyze)
        const jsonDate = neededDate.toJSON()
        // console.log(neededDate);
        // console.log(jsonDate);

        const result = await getCalorieByDateAPI(jsonDate)
        console.log(result.data.response);                 //------------------bug found giving undefined at first
        const warningMessage = result.data.response
        warningMessage && alert(warningMessage)

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

        setDateForCalAnalyze()
        setShow(false)


      } else {
        alert("Provide Date for Analyze")
        setShow(false)

      }

    } catch (error) {
      console.log(error);
      setShow(false)
      setDateForCalAnalyze()
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

        } else {
          alert("No Records Found!")
        }

        handleClose()
      }


    } catch (error) {
      console.log(error);
      handleClose()

    }

  }


  // _________________________________________________SLEEP FUNCTIONS___________

  const getSleepByLimit = async (limit) => {
    console.log("In sleeep", limit);

  }




  

  const getWaterIntakeByLimit = async (limit) => {
    console.log("In water", limit);

  }
  const getWeightByLimit = async (limit) => {
    console.log("In weight", limit);

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
                  label: 'Calories',
                  yAxisKey: 'labelAxis',
                  layout: 'horizontal',
                },
              ]}
              xAxis={[{
                scaleType: 'linear',
                label: 'Calories',
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


        </div>


        <div className='section3 d-flex justify-content-center align-items-center'>

          {dataS2 && <h3 className='text-center'>Date Analyze Report</h3>}


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
              <Form.Control type="date" onChange={e => setDateForCalAnalyze(e.target.value)} placeholder="Recorded Date" />
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
              dataName === "SLEEP" && <Button variant="primary">Analyse</Button>
            }
            {
              dataName === "WATER INTAKE" && <Button variant="primary">Analyse</Button>
            }
            {
              dataName === "WEIGHT" && <Button variant="primary">Analyse</Button>
            }



          </div>


        </Modal.Body>
      </Modal>




    </div>
  )
}

export default Report