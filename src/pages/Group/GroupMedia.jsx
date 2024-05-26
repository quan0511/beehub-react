import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
function GroupMedia({group_medias}){
    return <Container>
        <Row>
            <Col xl={11} className="mx-auto">
                <div className="border-1 rounded-2 border p-4 text-start" style={{marginTop: "150px", boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 2px, rgba(0, 0, 0, 0.03) 0px 2px 4px, rgba(0, 0, 0, 0.03) 0px 4px 8px, rgba(0, 0, 0, 0.03) 0px 8px 16px, rgba(0, 0, 0, 0.03) 0px 16px 32px, rgba(0, 0, 0, 0.03) 0px 32px 64px"}}>
                    <h5>Media</h5>
                    <Container>
                        <Row xl={5}>
                            {group_medias.map((group_media,index)=>{
                                return (<Col key={index} className="p-1">
                                    <Image src={group_media.media} fluid  />
                                </Col>);
                            })}
                        </Row>
                    </Container>
                </div>
            </Col>
        </Row>
    </Container>;
}
export default GroupMedia;