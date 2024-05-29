import React from "react";
import { Formik } from 'formik';
import { Button, Col, Container,  Form,  Row } from "react-bootstrap";
import * as Yup from 'yup';
export const GeneralSetting = ({group})=>{
    const schema = Yup.object().shape({
        groupname: Yup.string().required(),
      });
    
    const readURLImage = (input)=> {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                console.log(e.target.result);
                document.getElementById("img-upload").setAttribute("src",e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
            document.getElementById("submit-image").hidden= false;
        }
    }
    const readURLBg = (input)=> {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                console.log(e.target.result);
                document.getElementById("bg-upload").setAttribute("src",e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
            document.getElementById("submit-background").hidden= false;
        }
    }  
    return (
        <div className="d-flex flex-column">
        <div>
            <label className="mb-2">Change Background</label>
            <div className="border rounded-2" style={{height: "150px",width: "100%"}}>
                {group.background_group !=null? 
                    <Image src={group.background_group} className="object-fit-cover" style={{height: "inherit",objectPosition: "center",width: "100%"}}/>
                    : <div style={{height: "inherit",objectPosition: "center",width: "100%",backgroundColor: "rgb(57,59,70,0.2)",}}>
                        <img id="bg-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}} />
                    </div>
                }
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <input type="file" name="background" id="background" className="form-control my-3" onChange={(e)=>readURLBg(e.target)} />
                <Button variant="primary" id="submit-background" hidden style={{width:"200px",marginLeft:"5px"}}>Save Change</Button>
            </div>
        </div>
        <div>
            <label className="mb-2">Change Image</label>
            <div className="border rounded-2" style={{height: "150px",width: "150px"}}>
                {group.background_group !=null? 
                    <Image src={group.background_group} id="img-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}}/>
                    : <div style={{height: "inherit",objectPosition: "center",width: "100%",backgroundColor: "rgb(57,59,70,0.2)",}}>
                        <img id="img-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}}/>
                    </div>
                }
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <input type="file" name="image" id="image" className="form-control my-3" onChange={(e)=>readURLImage(e.target)}  />
                <Button variant="primary" id="submit-image" hidden style={{width:"200px",marginLeft:"5px"}}>Save Change</Button>
            </div>
        </div>
        <div>
            <Formik
                validationSchema={schema}
                initialValues={{
                    groupname: group.groupname,
                    description: group.description,
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            > {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="groupnname">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control  name="groupname" value={values.groupname} onChange={handleChange} isValid={touched.groupname && !errors.groupname} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label >Description</Form.Label>
                        <Form.Control as="textarea" rows={3}  name="description" defaultValue={values.description} />

                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>)}
            </Formik>
        </div>
        </div>
    );
}