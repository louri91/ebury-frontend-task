import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

class EmailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: props.to,
      cc: props.cc,
      bcc: props.bcc,
      subject: props.subject,
      message: props.message,
      attachedImages: props.attachedImages
    }
  }

  render() {
    return <div className="card-block">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-2">
            <i className="fa fa-check-circle"></i>
          </div>
          <div className="col-12 text-center">
            <h1>Your email has been sent</h1>
          </div>
        </div>
        <hr />
        <div className="container mt-4">
          <div className="row">
            <h2 className="font-weight-bold">{this.state.subject}</h2>
          </div>
          <div className="row">
            <p>to {this.state.to.split(",").map(function (email) {
              return <a className="email-link" href={"mailto:" + email} key={email.id}>{email}</a>;
            })}</p>
          </div>
          <div className="row">
            <p className="message">{this.state.message}</p>
          </div>
          <div className="row mt-4">
            <div className="container">
              <div className="row images-preview">
                {this.state.attachedImages.map(function (image) {
                  return <div className="image-preview" key={image.id}>
                    <img alt={image.name} src={image} key={image.id} />
                  </div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default EmailView;