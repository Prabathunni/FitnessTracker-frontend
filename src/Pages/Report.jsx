import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { LineChart } from '@mui/x-charts'
import styles from './ReportPage.module.css'
import UpdatePopUp from '../Components/UpdatePopUp'

function Report() {

  const [showUpdatePopUp, setShowUpdatePopUp] = useState(false)


  const [dataS1, setDataS1] = useState()


  const getChartData = () => {
    let datas = [
      {
        date: 'Wed Jun 18 2025 22:52:01 GMT+0530 (India Standard Time)',
        value: 2000,
        unit: "kcal",
      },
      {
        date: 'Wed Jun 17 2025 22:52:01 GMT+0530 (India Standard Time)',
        value: 2500,
        unit: "kcal",

      },
      {
        date: 'Wed Jun 16 2025 22:52:01 GMT+0530 (India Standard Time)',
        value: 3000,
        unit: "kcal",
      },
      {
        date: 'Wed Jun 15 2025 22:52:01 GMT+0530 (India Standard Time)',
        value: 1300,
        unit: "kcal",
      },
      {
        date: 'Wed Jun 14 2025 22:52:01 GMT+0530 (India Standard Time)',
        value: 1200,
        unit: "kcal",
      },
    ]


    let valueForLineChart = datas.map((data) => {
      let value = JSON.stringify(data.value)
      return value
    })


    



    let valueForXaxis = datas.map((data) => {
      let value = new Date(data.date);
      return value
    })

    setDataS1({
      data: valueForLineChart,
      title: "1 Day Calarie Intake",
      xAxis: {
        data: valueForXaxis, // 18,17,16,15,14
        label: "Last 5 Days",
        scaleType: "time"
      }
    })


  }


  useEffect(() => {
    getChartData()
  }, [])




  return (
    <div className={`${styles.reportSection}`}>
      <Header />

      <div className='d-flex flex-wrap justify-content-center'>

        <div className='section1'>
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


      </div>


      <div className='d-flex flex-column gap-4 position-fixed bottom-0 end-0 m-5'>
        <button className="btn btn-warning" onClick={() => setShowUpdatePopUp(true)}>
          Update Report <i class="fa-solid fa-file-pen ms-2"></i>
        </button>
        <button className="btn btn-primary">
          Analyse <i class="fa-solid fa-magnifying-glass-chart ms-2"></i>
        </button>

      </div>


      {
        showUpdatePopUp && <UpdatePopUp setShowUpdatePopUp={setShowUpdatePopUp} />
      }



    </div>
  )
}

export default Report