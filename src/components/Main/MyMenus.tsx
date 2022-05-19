import {
    AdministratorsAccountControl,
    AdministratorsSelectCourseMenuType,
    myMenuItem,
    PeopleType,
    SpecificMenuType,
    StudentLeaveMenuType,
    StudentSelectCourseMenuType, TeacherAndAdministratorsLeaveMenuType, TeacherSelectCourseMenuType
} from "./mainConfig";
import {isInEnum} from "../../tools";
import {
    AddUserIcon, AdminViewCourseIcon,
    AllCourseIcon,
    CommitLeaveIcon,
    DelCourseIcon, DelUserIcon, JugLeaveIcon,
    ViewCourseIcon,
    ViewLeaveIcon,
    ViewMsgReceiveIcon, ViewMsgSendIcon, ViewUserIcon, WriteMsgIcon
} from "../../icons";
import React from "react";
import {MessageMenuType} from "./mainConfig";
import {FileAddOutlined} from "@ant-design/icons";

export const getMenu = (peopleType:PeopleType, specificType:SpecificMenuType):myMenuItem[]=>{
    switch (peopleType) {
        case PeopleType.student:{
            //选课
            if (isInEnum(specificType,StudentSelectCourseMenuType))
            {
                return [
                    {
                        icon:<AllCourseIcon/>,
                        label:"查看所有课程"
                    },
                    {
                        icon:<DelCourseIcon/>,
                        label:"删除已选课程"
                    },
                    {
                        icon:<ViewCourseIcon/>,
                        label:"查看已选课程"
                    }
                ]
            }
            else if (isInEnum(specificType,StudentLeaveMenuType)){
                return [
                    {
                        icon:<CommitLeaveIcon/>,
                        label:"申请全新的请假单"
                    },
                    {
                        icon:<ViewLeaveIcon/>,
                        label:"查看提交的请假单"
                    }
                ]
            }
            else if (isInEnum(specificType,MessageMenuType)){
                return [
                    {
                        icon:<ViewMsgReceiveIcon/>,
                        label:"收件箱"
                    },
                    {
                        icon:<WriteMsgIcon/>,
                        label:"写消息"
                    },
                    {
                        icon:<ViewMsgSendIcon/>,
                        label:"已发送"
                    },

                ]
            }
            break
        }
        case PeopleType.teacher:{
            if (isInEnum(specificType,TeacherSelectCourseMenuType))
            {
                return [
                    {
                        icon:<AllCourseIcon/>,
                        label:"选择自己要上的课"
                    },
                    {
                        icon:<DelCourseIcon/>,
                        label:"删除自己要上的课"
                    },
                    {
                        icon:<ViewCourseIcon/>,
                        label:"查看自己要上的课"
                    }
                ]
            }
            else if (isInEnum(specificType,TeacherAndAdministratorsLeaveMenuType)){
                return [
                    {
                        icon:<JugLeaveIcon/>,
                        label:"审批提交的请假单"
                    },
                    {
                        icon:<ViewLeaveIcon/>,
                        label:"查看提交的请假单"
                    }
                ]
            }
            else if (isInEnum(specificType,MessageMenuType)){
                return [
                    {
                        icon:<ViewMsgReceiveIcon/>,
                        label:"收件箱"
                    },
                    {
                        icon:<WriteMsgIcon/>,
                        label:"写消息"
                    },
                    {
                        icon:<ViewMsgSendIcon/>,
                        label:"已发送"
                    },

                ]
            }
            break
        }
        case PeopleType.administrators:{
            if (isInEnum(specificType,AdministratorsSelectCourseMenuType)){
                return [
                    {
                        icon:<FileAddOutlined />,
                        label:"添加一门新的课程"
                    },
                    {
                        icon:<DelCourseIcon/>,
                        label:"删除已经添加课程"
                    },
                    {
                        icon:<AdminViewCourseIcon/>,
                        label:"查看选课情况"
                    }
                ]
            }
            else if (isInEnum(specificType,TeacherAndAdministratorsLeaveMenuType)){
                return [

                    {
                        icon:<ViewLeaveIcon/>,
                        label:"查看提交的请假单"
                    },
                    {
                        icon:<JugLeaveIcon/>,
                        label:"审批提交的请假单"
                    }
                ]
            }
            else if (isInEnum(specificType,MessageMenuType)){
                return [
                    {
                        icon:<ViewMsgReceiveIcon/>,
                        label:"收件箱"
                    },
                    {
                        icon:<WriteMsgIcon/>,
                        label:"写消息"
                    },
                    {
                        icon:<ViewMsgSendIcon/>,
                        label:"已发送"
                    },

                ]
            }else if (isInEnum(specificType,AdministratorsAccountControl)) {
                return  [
                    {
                        icon:<ViewUserIcon/>,
                        label:"查看所有用户"
                    },
                    {
                        icon:<AddUserIcon/>,
                        label:"添加新的用户"
                    },
                    {
                        icon:<DelUserIcon/>,
                        label:"删除已有用户"
                    }
                ]
            }
            break
        }
    }
    return []
}
