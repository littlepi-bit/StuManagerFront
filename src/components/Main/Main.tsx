import {Button, Layout, Menu, MenuProps, Modal, Skeleton, Table} from 'antd';
import React, {useEffect, useState} from "react"
import "./index.scss"
import {useMainRoute, useToLogin, useToOptions} from "../../hooks/myRouter";
import {useParams} from "react-router-dom";
import {
    AdministratorsAccountControl,
    AdministratorsSelectCourseMenuType,
    MessageMenuType,
    PeopleType,
    SpecificMenuType,
    StudentLeaveMenuType,
    StudentSelectCourseMenuType,
    TeacherAndAdministratorsLeaveMenuType,
} from './mainConfig'
import {getColumns, waitData} from "./MyTables";
import {getMenu} from "./MyMenus";
import {getSub, getTitle, getUserInformation, info, tellError} from "../../tools";
import CommitLeave from "./MyForms/CommitLeave/CommitLeave";
import SendMessage from "./MyForms/SendMessage/SendMessage";
import AddCourse from "./MyForms/AddCourse/AddCourse";
import AddUser from "./MyForms/AddUser/AddUser";
import Curriculum from "./Curriculum";

const { Header, Content, Sider } = Layout;











const Main=() => {
    const params  = useParams()
    const people = (params.people) as PeopleType
    const specific = (params.specific) as SpecificMenuType
    const toOptions = useToOptions(people)
    const toLogin = useToLogin()

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
    const [forceFlag,forceUpdate] = useState(0)
    useEffect(
        ()=>{
            // 先判断你是否是正常方式登录
            if (!sessionStorage['userId']||!sessionStorage['password']){
                tellError('抱歉，您还没有登录！')
                toLogin()
            }
            if (sessionStorage['peopleType'] !== params.people){
                tellError('无权访问!')
                toLogin()
            }
        }
        ,[]
    )

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


    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    //根据不同情况渲染不同东西




    let formList:SpecificMenuType[] = [StudentLeaveMenuType.commitLeave,MessageMenuType.writeMessage,AdministratorsSelectCourseMenuType.addNewCourse,AdministratorsAccountControl.addNewUser,TeacherAndAdministratorsLeaveMenuType.teaCommitLeave]
    if (formList.indexOf(specific)>=0){
        //表单
        switch (specific) {
            case StudentLeaveMenuType.commitLeave:{

                mainInfo = <div className={"myForm"}>
                    <CommitLeave peopleType={people}/>
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
            case TeacherAndAdministratorsLeaveMenuType.teaCommitLeave:{
                mainInfo = <div className={"myForm"}>
                    <CommitLeave peopleType={people}/>
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
            const columns = getColumns(people,specific,()=>{
                forceUpdate(forceFlag+1)
            })

            if (specific === StudentSelectCourseMenuType.seeSelected){
                mainInfo = <>
                    <Button style={{marginBottom:10}} type={"primary"}
                        onClick={showModal}
                    >按周查看课表</Button>
                    {/*// @ts-ignore*/}
                    <Table columns={columns} dataSource={tableData}/>
                </>
            }else {
                // @ts-ignore
                mainInfo = <Table columns={columns} dataSource={tableData}/>
            }

        }
    }

    const [collapsed, setCollapsed] = useState(false);
    return  <div className={"Main"}>
        <Modal title="课程表如下" width={"80%"}  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Curriculum/>
        </Modal>
        <Layout>
            <Header className="header">
                <Button onClick={toOptions} type={"default"}>返回选择界面</Button>
                <div className="title">{getTitle(people,specific)}</div>
                <div className="hello">
                    欢迎 {userName} {people === PeopleType.student?"同学":people===PeopleType.teacher?"老师":"管理员"}!
                </div>
            </Header>
            <Layout>
                <Sider collapsed={collapsed}  onCollapse={value => setCollapsed(value)}  collapsible width={200} className="site-layout-background">
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
                <Layout style={{ padding:collapsed?24:12  }}>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding:collapsed?24:0 ,
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
