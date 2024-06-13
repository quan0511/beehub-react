import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../auth/authSlice";
import { useCreateReportMutation, useGetReportTypesQuery } from "../features/userApiSlice";
import { showMessageAlert } from "../features/userSlice";

const ModalReport = ({showReport,setShowReport, postTarget,userTarget,groupTarget})=>{
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const [targetReport, setTargetReport] = useState(null);
    const [createReport,{isLoading,isSuccess, isError}] = useCreateReportMutation();
    const {data: reportTypes} = useGetReportTypesQuery();
    return (
        <Modal show={showReport} onHide={()=>setShowReport(false)}>
                      <Modal.Header className="text-center" closeButton>
                        <Modal.Title>Report</Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={{
                          sender_id: user.id,
                          target_user_id: userTarget!=null?userTarget.id:null,
                          target_post_id: postTarget!=null?postTarget.id:null,
                          target_group_id: groupTarget!=null?groupTarget.id:null,
                          type_id: targetReport,
                          add_description: ""
                        }}
                        onSubmit={async (values, { ...props }) => {
                            try {
                                if(targetReport==null){
                                  props.setErrors({type_id : "Type Report is required"});
                                }else{
                                  values.type_id = targetReport;
                                  await createReport({id:user.id,data:values });
                                  dispatch(showMessageAlert("Send Report successfully"));
                                  setShowReport(false);
                                }
                            } catch (error) {
                                console.error('An error occurred while submitting the form.', error);
                            }
                        }}
                    > {({ handleSubmit, handleChange, values, touched, errors }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                      <Modal.Body>
                             <Form.Label>Please select a problem</Form.Label>
                             <Form.Select name="report_type" aria-label="select report type" defaultValue={values.type_id} className="mb-3"
                                isInvalid={!!errors.type_id}
                                onChange={(e)=>{
                                    let valueId = e.target.value;
                                    let des = reportTypes.find((element) => element.id == valueId);
                                    document.getElementById("descriptionReport").innerText = des.description;
                                    setTargetReport(valueId);
                                }}>
                              <option>Open this select menu</option>
                              { reportTypes!=null && reportTypes.length !=0?
                                reportTypes.map((re, index)=>{
                                  return <option key={re.id} value={re.id}>{re.title}</option>
                                })
                                :<></>
                              }
                            </Form.Select>
                            {errors.type_id && touched.type_id && (
                                  <span className="text-danger">{errors.type_id}</span>
                              )}
                            <div id="descriptionReport" className="mb-3"></div>
                            <Form.Control as="textarea" rows={3}  name="add_description"  className="mb-3"
                                defaultValue={values.add_description} onChange={handleChange} />
                          
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setShowReport(false)}>
                          Close
                        </Button>
                        <Button variant="primary" type="submit">
                          Send Report
                        </Button>
                      </Modal.Footer>
                      </Form>
                      )}</Formik>
                    </Modal>
    );
}
export default ModalReport;