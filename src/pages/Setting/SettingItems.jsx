import React, { useEffect } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import { useCheckSetUpPostsQuery } from "../../user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../auth/authSlice";
import axios from "axios";
import APIService from "../../features/APIService";

export const SettingItems = ({settings,setMessageToast,setMessageToastError}) =>{
    const appUser = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const {data: settingPost} = useCheckSetUpPostsQuery({id: appUser.id});
    
    const handleChangeSettingPost = async (e)=>{
        try {
            let response= await axios.post(`${APIService.URL_REST_API}/update/setting/${appUser.id}`,e.target.value,{
                headers: {
                  Authorization: 'Bearer ' + token,
                  "Content-Type": "text/plain",
                  withCredentials: true
                }
            });
            if (response.status == '200') {
                setMessageToast(true);
                document.getElementById("addText").innerHTML=`Change successfully the setting type of  ${response.data['result']} posts `;
            } else {
                console.error('An error occurred while submitting.');
                setMessageToastError(true);
            }
        } catch (error) {
            console.error('An error occurred while submitting the form.', error);
            setMessageToastError(true);
        }
    }
    const postSettingItem = async(jsonData)=>{
        try {
            let response= await axios.post(`${APIService.URL_REST_API}/setting/add/${appUser.id}`,jsonData,{
                headers: {
                  Authorization: 'Bearer ' + token,
                  "Content-Type": "application/json",
                  withCredentials: true
                }
            });
            if (response.status == '200') {
                setMessageToast(true);
            } else {
                console.error('An error occurred while submitting.');
                setMessageToastError(true)
            }
        } catch (error) {
            console.error('An error occurred while submitting the form.', error);
            setMessageToastError(true)
        }
    }
    const handleChangeSettingPhone = async (e) => {
        let jsonData = {
            "phone": e.target.value
        }
        postSettingItem(jsonData);
    }
    const handleChangeSettingEmail = async (e)=>{
        let jsonData = {
            "email": e.target.value
        }
        postSettingItem(jsonData);
    }
    const handleChangeSettingGender = async (e)=>{
        let jsonData = {
            "gender": e.target.value
        }
        postSettingItem(jsonData);
    }
    const handleChangeSettingListFriend = async(e)=>{
        let jsonData = {
            "list_friend": e.target.value
        }
        postSettingItem(jsonData);
    }
    const handleChangeSettingBirthday = async(e)=>{
        let jsonData = {
            "birthday": e.target.value
        }
        postSettingItem(jsonData);
    }
    const setValueSelect = (idSelect, setValue)=>{
        let collection = document.getElementById(idSelect).children;
        for (let i = 0; i < collection.length; i++) {
            let va = collection[i].value;
            if(va == setValue){
              collection[i].setAttribute('selected',true);
            }
        }
    }
    useEffect(()=>{
        if(settings.length>0){
            for(let i =0; i<settings.length;i++){
                switch (settings[i].setting_item) {
                    case "phone":
                        setValueSelect("settingPhone",settings[i].setting_type);
                        break;
                    case "email":
                        setValueSelect("settingEmail",settings[i].setting_type);
                        break;
                    case "gender":
                        setValueSelect("settingGender",settings[i].setting_type);
                        break;
                    case "birthday":
                        setValueSelect("settingBirthday",settings[i].setting_type);
                        break;
                    case "list_friend":
                        setValueSelect("settingListFriend",settings[i].setting_type);
                        break;
                    default:
                        break;
                }
            }
        }

    },[])
    return (
        <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Who can see my posts?</Accordion.Header>
            <Accordion.Body>
                <Row>
                    <Col xl={8}>
                        Setting peple can see all posts in your profile or can see your posts by searching
                    </Col>
                    <Col xl={4}>
                        <Form.Select id="setpost" name="setting_post" value={settingPost !=null?settingPost["result"]:"OPTION"} onChange={handleChangeSettingPost}>
                            <option value="OPTION">Options</option>
                            <option value="PUBLIC">Public all posts</option>
                            <option value="FOR_FRIEND">Just For Friends</option>
                            <option value="HIDDEN">Private</option>
                        </Form.Select>
                    </Col>
                    <Col xl={12}>
                    <div id="addText"className="text-success"></div>
                    </Col>
                </Row>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Who can see my profile?</Accordion.Header>
            <Accordion.Body>
                <Row>
                    <Col xl={8} className="mb-3">
                        Who can see my phone number?
                    </Col>
                    <Col xl={4} className="mb-3">
                        <Form.Select aria-label="Setting Phone number" id="settingPhone" onChange={handleChangeSettingPhone} >
                            <option value="PUBLIC">Public</option>
                            <option value="FOR_FRIEND">Just For Friends</option>
                            <option value="HIDDEN">Private</option>
                        </Form.Select>
                    </Col>
                    <Col xl={12}>
                        <div id="addText2"className="text-success"></div>
                    </Col>
                    <Col xl={8} className="mb-3">
                        Who can see my email?
                    </Col>
                    <Col xl={4} className="mb-3">
                        <Form.Select aria-label="Setting Email" id="settingEmail" onChange={handleChangeSettingEmail} >
                            <option value="PUBLIC">Public</option>
                            <option value="FOR_FRIEND">Just For Friends</option>
                            <option value="HIDDEN">Private</option>
                        </Form.Select>
                    </Col>
                    <Col xl={8} className="mb-3">
                        Who can see my gender?
                    </Col>
                    <Col xl={4} className="mb-3">
                        <Form.Select aria-label="Setting Gender" id="settingGender" onChange={handleChangeSettingGender}>
                            <option value="PUBLIC">Public</option>
                            <option value="FOR_FRIEND">Just For Friends</option>
                            <option value="HIDDEN">Private</option>
                        </Form.Select>
                    </Col>
                    <Col xl={8} className="mb-3">
                        Who can see my list friend?
                    </Col>
                    <Col xl={4} className="mb-3">
                        <Form.Select aria-label="Setting List Friend" id="settingListFriend" onChange={handleChangeSettingListFriend} >
                            <option value="PUBLIC">Public</option>
                            <option value="FOR_FRIEND">Just For Friends</option>
                            <option value="HIDDEN">Private</option>
                        </Form.Select>
                    </Col>
                    <Col xl={8} className="mb-3">
                        Who can see my birthday?
                    </Col>
                    <Col xl={4} className="mb-3">
                        <Form.Select aria-label="Setting Birthday" id="settingBirthday" onChange={handleChangeSettingBirthday} >
                            <option value="PUBLIC">Public</option>
                            <option value="FOR_FRIEND">Just For Friends</option>
                            <option value="HIDDEN">Private</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
    )
}