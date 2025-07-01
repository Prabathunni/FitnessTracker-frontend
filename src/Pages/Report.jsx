import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { LineChart } from '@mui/x-charts'
import styles from './ReportPage.module.css'
import UpdatePopUp from '../Components/UpdatePopUp'
import { useAuth } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { getCalorieByLimitAPI } from '../services/userServices'

function Report() {

  const { showUpdatePopUp, setShowUpdatePopUp } = useAuth()


  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [checkReportName, setCheckReportName] = useState()
  const { dataName } = useParams()

  const [dataS1, setDataS1] = useState()

  const getCheckReportName = () => {
    setCheckReportName(dataName)
  }

  const getCalorieByLimit = async (limit) => {

    try {
      console.log(limit);
      if (limit) {
        const result = await getCalorieByLimitAPI({ limit })
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

          console.log(valueForXaxis);


          // TITLE FOR Y AXIS
          let titleDatesForY = caloriesDataArr.map((item) => {
            let dateObj = new Date(item.date)
            let day = dateObj.getDate();
            let Month = dateObj.toLocaleString('default', { month: 'short' });
            let outputTitle = `${Month} Day ${day}`
            return outputTitle
          })

          console.log(titleDatesForY);


          //   //  complete values for the chart
          //   setDataS1({
          //     data: valueForLineChart,
          //     title: "1 Day Calarie Intake",
          //     xAxis: {
          //       data: valueForXaxis, // [18,17,16,15,14]
          //       label: "Last 5 Days",
          //       scaleType: "time"
          //     }
          //   })

          setDataS1(
            {
              data: valueForLineChart,
              title: "CALORIE INTAKE",
              xAxis: {
                data: valueForXaxis,
                label: `${limit} Entries`,
                scaleType: "time"
              }
            }
          )

        } else {
          alert("No Records Found!")
        }

      }
      handleClose()


    } catch (error) {
      console.log(error);

    }

  }



  // const getChartData = () => {
  //   let datas = [
  //     {
  //       date: 'Wed Jun 18 2025 22:52:01 GMT+0530 (India Standard Time)',
  //       value: 2000,
  //       unit: "kcal",
  //     },
  //     {
  //       date: 'Wed Jun 17 2025 22:52:01 GMT+0530 (India Standard Time)',
  //       value: 2500,
  //       unit: "kcal",

  //     },
  //     {
  //       date: 'Wed Jun 16 2025 22:52:01 GMT+0530 (India Standard Time)',
  //       value: 3000,
  //       unit: "kcal",
  //     },
  //     {
  //       date: 'Wed Jun 15 2025 22:52:01 GMT+0530 (India Standard Time)',
  //       value: 1300,
  //       unit: "kcal",
  //     },
  //     {
  //       date: 'Wed Jun 14 2025 22:52:01 GMT+0530 (India Standard Time)',
  //       value: 1200,
  //       unit: "kcal",
  //     },
  //   ]



  // }




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
    // getChartData()
    getCheckReportName()
  }, [])



  return (
    <div className={`${styles.reportSection}`}>
      <Header />

      <div className='d-flex flex-wrap justify-content-center' style={{ marginTop: "60px" }}>

        <div className='section1'>
          {
            dataS1 ?
              <LineChart
                xAxis={[{
                  id: "day",
                  data: dataS1.xAxis.data,
                  scaleType: dataS1.xAxis.scaleType,
                  label: dataS1.xAxis.label,
                  valueFormatter: (date) => {
                    const d = new Date(date);
                    return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
                  }

                }]}
                series={[
                  {
                    id: "calorie",
                    data: dataS1.data,
                    label: dataS1.title,
                    valueFormatter: (value) => `${value} kcal`
                  },
                ]}
                height={350}
                width={700}
                grid={{ vertical: true, horizontal: true }}
              />

              :
              <LineChart
                xAxis={[{
                  id: "day",
                  data: [
                    "2025-06-21",
                    "2025-06-22",
                    "2025-06-23",
                    "2025-06-24",
                    "2025-06-25",
                    "2025-06-26",
                    "2025-06-27"
                  ],
                  scaleType: "time",
                  label: "Date",
                  valueFormatter: (date) => {
                    const d = new Date(date);
                    return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
                  }
                }]}
                series={[
                  {
                    id: "calorie",
                    data: [1800, 1900, 2000, 2200, 2100, 1950, 2050],
                    label: "ANALYZE A REPORT",
                    valueFormatter: (value) => `${value} kcal`
                  },
                ]}
                height={350}
                width={700}
                grid={{ vertical: true, horizontal: true }}
              />



          }
        </div>

        {/* 
        <div className='section2'>
          {
            dataS1 &&
            <LineChart
              xAxis={[{
                id: "day",
                data: dataS1.xAxis.data,
                scaleType: dataS1.xAxis.scaleType,
                label: dataS1.xAxis.label,
                valueFormatter: (date) => {
                  const d = new Date(date);
                  return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
                }

              }]}
              series={[
                {
                  id: "calorie",
                  data: dataS1.data,
                  label: dataS1.title,
                  valueFormatter: (value) => `${value} kcal`
                },
              ]}
              height={350}
              width={400}
              grid={{ vertical: true, horizontal: true }}
            />


          }
        </div>


        <div className='section3'>
          {
            dataS1 &&
            <LineChart
              xAxis={[{
                id: "day",
                data: dataS1.xAxis.data,
                scaleType: dataS1.xAxis.scaleType,
                label: dataS1.xAxis.label,
                valueFormatter: (date) => {
                  const d = new Date(date);
                  return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
                }

              }]}
              series={[
                {
                  id: "calorie",
                  data: dataS1.data,
                  label: dataS1.title,
                  valueFormatter: (value) => `${value} kcal`
                },
              ]}
              height={350}
              width={400}
              grid={{ vertical: true, horizontal: true }}
            />


          }
        </div>


        <div className='section4'>
          {
            dataS1 &&
            <LineChart
              xAxis={[{
                id: "day",
                data: dataS1.xAxis.data,
                scaleType: dataS1.xAxis.scaleType,
                label: dataS1.xAxis.label,
                valueFormatter: (date) => {
                  const d = new Date(date);
                  return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
                }

              }]}
              series={[
                {
                  id: "calorie",
                  data: dataS1.data,
                  label: dataS1.title,
                  valueFormatter: (value) => `${value} kcal`
                },
              ]}
              height={350}
              width={400}
              grid={{ vertical: true, horizontal: true }}
            />


          }
        </div>

 */}
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
              <Form.Control type="date" placeholder="Recorded Date" />
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
              dataName === "CALORIE INTAKE" && <Button variant="primary">Analyse</Button>
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