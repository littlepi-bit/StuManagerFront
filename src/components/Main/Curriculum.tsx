import React, {useEffect, useState} from 'react'
import {getUserInformation, myPost} from "../../tools";
import {Table} from "antd";

let map = {
  "1":"一",
  "2":"二",
  "3":"三",
  "4":"四",
  "5":"五",
  "6":"六",
  "7":"日",
}

let times = {
    "1":"08:00-08:45",
    "2":"08:50-09:35",
    "3":"09:50-10:35",
    "4":"10:40-11:25",
    "5":"11:30-12:15",
    "6":"14:00-14:45",
    "7":"14:50-15:35",
    "8":"15:50-16:35",
    "9":"16:40-17:25",
    "10":"17:30-18:15",
    "11":"19:30-20:15",
    "12":"20:20-21:05",
    "13":"21:10-21:55",
}

const Week:React.FC<{
    week:string
}> = ({week}) => {
   // @ts-ignore
  const info1 = `星期${map[week]}`
    return <>
      <div>
        <div>{info1}</div>
      </div>
    </>
}

export default function Curriculum() {
  let [courseList, setCourseList] = useState<any[]>([]);
  let [columns, setColumns] = useState<any[]>([]);
  useEffect(
() => {
      let {userId} = getUserInformation()
      myPost('/viewSelectedCoursesByWeek',{
          userId
      }).then(res => {
        const infoColumns = [
          {
            title: '节数',
            dataIndex: 'sectionNumber',
            key: 'sectionNumber',
            width: "5%",
            render:(_:any,record:any,index:any)=>{
              return index+1
            }
          },
          {
            title: '上课时间',
            dataIndex: 'courseTime',
            key: 'courseTime',
            width: '10%',
            render:(_:any,record:any,index:any)=>{
                // @ts-ignore
                return times[`${index+1}`]
            }
          },
          {
            title: <Week week={"1"}/>,
            dataIndex: 'week1',
            key: 'week1',
            width: '10%',
          },
            {
                title: <Week week={"2"}/>,
                dataIndex: 'week2',
                key: 'week2',
                width: '10%',

            },
            {
                title: <Week week={"3"}/>,
                dataIndex: 'week3',
                key: 'week3',
                width: '10%',

            },
            {
                title: <Week week={"4"}/>,
                dataIndex: 'week4',
                key: 'week4',
                width: '10%',

            },
            {
                title: <Week week={"5"}/>,
                dataIndex: 'week5',
                key: 'week5',
                width: '10%',
            },
            {
                title: <Week week={"6"}/>,
                dataIndex: 'week6',
                key: 'week6',
                width: '10%',
            },
            {
                title: <Week week={"7"}/>,
                dataIndex: 'week7',
                key: 'week7',
                width: '10%',
            }

        ];




        setColumns(infoColumns);
        let out = []
        for(let j=1;j<=13;j++) {
          let one = {
            week1:"",
            week2:"",
            week3:"",
            week4:"",
            week5:"",
            week6:"",
            week7:"",
          }
          for (let i = 0; i < res.data.length; i++) {
            let {week, begin, end, courseId, courseName, teacher, place} = res.data[i]
            if (begin<=j && j<=end) {
              // @ts-ignore
              one[`week${week}`] = `${courseId} ${courseName} (${teacher}) ${place}`
            }
          }
          out.push(one)
        }
        setCourseList(out)
      })
    }
    ,[]
  )

  return (
    <div   className = "Curriculum">
      <Table   bordered   pagination={false}  dataSource={courseList} columns={columns} />;
    </div>
  )
}
