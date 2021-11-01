import React from 'react';
import {Card} from 'react-bootstrap';

const CardRx=({imageUrl, imgPosition, title, footerText, bodyText, isCustomerCard, customerCard })=>(
        <Card style={{ 'border-radius': '.9rem'}}>
          {imageUrl&&<Card.Img variant={imgPosition?imgPosition:'top'} src={imageUrl} />}
          {isCustomerCard ?
            <Card.Body>
              {customerCard}
            </Card.Body>:
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text> {bodyText} </Card.Text>
            </Card.Body>}
          { footerText && <Card.Footer>
                            <Card.Subtitle>
                              {footerText}
                            </Card.Subtitle>
                          </Card.Footer>
          }
        </Card>
  );


export default CardRx
