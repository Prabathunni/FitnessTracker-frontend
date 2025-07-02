import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { BarChart, BarPlot, ChartContainer, ChartsTooltip, ChartsXAxis, ChartsYAxis, LineChart } from '@mui/x-charts'
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

  const [dataS1, setDataS1] = useState()
  // const [dataS2,setDataS2] = useState()
  const [dateForCalAnalyze, setDateForCalAnalyze] = useState()

  const [goalCalorie, setGoalCalorie] = useState(0);
  const [todaysIntake, setTodaysIntake] = useState(0);


  // Todays and Target###############3
  const getAllReport = async () => {
    try {
      const result = await getAllReportAPI()
      const reportData = result.data.response;


      // Set goal and today's total
      setGoalCalorie(reportData[0]?.goal || 0);
      setTodaysIntake(reportData[0]?.value || 0);



    } catch (error) {
      console.log(error.response.data.error);

    }
  }

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
        alert(result.data.response);
        const caloriesDataArr = result.data
        // console.log(caloriesDataArr);

        if (caloriesDataArr.length > 0) {

          // Y AXIS -----[cal1,cal2,......]
          let valueForLineChart = caloriesDataArr.map((item) => {
            let value = item.quantity
            return value
          })

          console.log(valueForLineChart);


          // // X-AXIS ----[date1,date2,.....]
          let valueForXaxis = caloriesDataArr.map((item) => {
            let value = new Date(item.date)
            return value
          })

          // console.log(valueForXaxis);

          setDataS1(
            {
              data: valueForLineChart,
              title: "CALORIE INTAKE",
              xAxis: {
                data: valueForXaxis,
                label: `${dateForCalAnalyze} Entries`,
                scaleType: "time"
              }
            }
          )
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
            if (!group[label]){
                group[label] = { label, month, day, intake: Number(intake) }
            }else{
              group[label].intake += Number(intake)
            }         
          })

          const groupedData = Object.values(group)
          console.log(groupedData);
          

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

  console.log(dataS1);








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

  const colorPalette = ['#ff7043', '#42a5f5', '#66bb6a', '#ab47bc']; // Orange, Blue, Green, Purple


  return (
    <div className={`${styles.reportSection}`}>
      <Header />

      <div className='px-5 d-flex gap-3'>
        <p className='bg-warning p-1 rounded shadow-sm px-2'>Today's Intake: {todaysIntake}</p>
        <p className='bg-info p-1 rounded shadow-sm px-2'>Goal Calorie: {goalCalorie}</p>

      </div>


      <div className='d-flex flex-column flex-md-row  flex-wrap justify-content-center' style={{ marginTop: "60px" }}>

        <div className='section1'>

          <BarChart
            xAxis={[{ scaleType: 'band', data: ["Today's Intake", "Goal"] }]}
            series={[
              {
                data: [todaysIntake, goalCalorie],
                label: 'Calories',
              },
            ]}
            palette={['#1976d2', '#ed6c02']} // ✅ Blue for intake, orange for goal
            height={370}
            width={500}
          />

        </div>


        <div className='section2'>


          {
            dataS1 ?
              <ChartContainer
                height={400}
                width={600}
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


              :

              <h3>NO broo</h3>

          }


        </div>


      </div>




      <div className='d-flex flex-column gap-4 position-fixed bottom-0 end-0 m-5'>

        <button className="btn btn-warning" onClick={() => setShowUpdatePopUp(true)}>
          Update Report <i class="fa-solid fa-file-pen ms-2"></i>
        </button>

        <button className="btn btn-primary" onClick={handleShow}>
          Analyse <i class="fa-solid fa-magnifying-glass-chart ms-2"></i>
        </button>

      </div>


      {
        showUpdatePopUp && <UpdatePopUp reportName={checkReportName} />
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