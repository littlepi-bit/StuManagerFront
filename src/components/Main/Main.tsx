import {Button, Layout, Menu, MenuProps, Skeleton, Table} from 'antd';
import React, {useEffect, useState} from "react"
import "./index.scss"
import {useMainRoute, useToOptions} from "../../hooks/myRouter";
import {useParams} from "react-router-dom";
import {
    AdministratorsAccountControl,
    AdministratorsSelectCourseMenuType,
    MessageMenuType,
    PeopleType,
    SpecificMenuType,
    StudentLeaveMenuType,
} from './mainConfig'
import {getColumns, waitData} from "./MyTables";
import {getMenu} from "./MyMenus";
import {getSub, getUserInformation} from "../../tools";
import CommitLeave from "./MyForms/CommitLeave/CommitLeave";
import SendMessage from "./MyForms/SendMessage/SendMessage";
import AddCourse from "./MyForms/AddCourse/AddCourse";
import AddUser from "./MyForms/AddUser/AddUser";

const { Header, Content, Sider } = Layout;











const Main=() => {
    const params  = useParams()
    const people = (params.people) as PeopleType
    const specific = (params.specific) as SpecificMenuType
    const toOptions = useToOptions(people)

    const toRoute = useMainRoute(people,specific)
    const {userName} = getUserInformation()
    const menus: MenuProps['items'] = getMenu(people,specific).map(
        (each, index) => {
            const key = String(index + 1);
            return {
                key: `sub${key}`,
                icon: each.icon,
                label: each.label,
            };
        },
    );
    const [tableData,changeTableData] = useState(null)
    const [forceFlag,forceUpdate] = useState(null)


    //副作用钩子，用于监听每一次数据请求需要更新页面
    useEffect(()=>{
        if (false){
            //表单

        }else {
            //表格
            console.log(specific)
            waitData(people, specific).then(r => {
                // @ts-ignore
                changeTableData(r.data)
            })
        }


    },[forceFlag,specific,people])


    //展示内容
    let mainInfo = <></>;



    //根据不同情况渲染不同东西




    let formList:SpecificMenuType[] = [StudentLeaveMenuType.commitLeave,MessageMenuType.writeMessage,AdministratorsSelectCourseMenuType.addNewCourse,AdministratorsAccountControl.addNewUser]
    if (formList.indexOf(specific)>=0){
        //表单
        switch (specific) {
            case StudentLeaveMenuType.commitLeave:{

                mainInfo = <div className={"myForm"}>
                    <CommitLeave/>
                </div>
                break
            }
            case MessageMenuType.writeMessage: {
                mainInfo = <div className={"myForm"}>
                    <SendMessage/>
                </div>
                break
            }
            case AdministratorsSelectCourseMenuType.addNewCourse: {
                mainInfo = <div className={"myForm"}>
                    <AddCourse/>
                </div>
                break
            }
            case AdministratorsAccountControl.addNewUser :{
                mainInfo = <div className={"myForm"}>
                    <AddUser/>
                </div>
                break
            }
        }
    }else {
        //表格
        if (tableData===null){
            //没数据
            //骨架屏
            mainInfo = <Skeleton active  />
        }else {
            const columns = getColumns(people,specific,forceUpdate)

            // @ts-ignore
            mainInfo = <Table columns={columns} dataSource={tableData}/>
        }
    }


    return  <div className={"Main"}>
        <Layout>
            <Header className="header">
                <Button onClick={toOptions} type={"default"}>返回选择界面</Button>
                <div className="hello">
                    欢迎 {userName} 同学!
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[`sub${getSub(specific)}`]}
                        style={{ height: '100vh', borderRight: 0,overflowY:"auto" }}
                        onClick={({key}:any)=>{
                            toRoute(key)
                        }}
                        items={menus}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {mainInfo}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>

}

export default Main
