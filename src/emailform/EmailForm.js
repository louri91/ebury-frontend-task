import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import EmailView from '../emailView/EmailView';

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      message: '',
      attachedImages: new Array(),
      validInputs: { to: true, cc: true, bcc: true, subject: false, message: false },
      validToSend: false,
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.validateEmailForm = this.validateEmailForm.bind(this);
    this.checkValidEmail = this.checkValidEmail.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteAttachedImage = this.deleteAttachedImage.bind(this);
  }

  deleteAttachedImage(event) {
    var attachedImages = this.state.attachedImages;
    var index = event.target.getAttribute('index');

    if (index > -1) {
      attachedImages.splice(index, 1);
      this.setState({
        attachedImages: attachedImages
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value },
      function () {
        this.setState({ validInputs: this.validateEmailForm() },
          function () {
            this.setState({ validToSend: Object.keys(this.state.validInputs).every(emailInput => this.state.validInputs[emailInput]) });
          });
      });
  }

  handleImageUpload(event) {
    var imagesList = event.target.files;
    var attachedImages = this.state.attachedImages;

    for (var i = 0; i < imagesList.length; i++) {
      attachedImages.push(URL.createObjectURL(imagesList[i]));
      this.setState({
        attachedImages: attachedImages
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ 'submitted': true });
  }

  validateEmailForm() {
    return {
      to: this.state.to.length > 0 ? this.checkValidEmail(this.state.to) : false,
      cc: this.state.cc.length > 0 ? this.checkValidEmail(this.state.cc) : true,
      bcc: this.state.bcc.length > 0 ? this.checkValidEmail(this.state.bcc) : true,
      subject: this.state.subject.length > 0 ? true : false,
      message: this.state.message.length > 0 ? true : false,
    };
  }

  checkValidEmail(emails) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

    var listEmails = emails.split(",").filter((email) => email);

    for (var email in listEmails) {
      if (!re.test(listEmails[email])) {
        return false;
      }
    }
    return true;
  }


  render() {
    if (this.state.submitted) {
      return <EmailView to={this.state.to} cc={this.state.cc} bcc={this.state.bcc} subject={this.state.subject} message={this.state.message} attachedImages={this.state.attachedImages} />;
    } else {
      return (
        <div>
          <h3 className="card-header">Send E-mail</h3>
          <div className="card-block">
            <div id="emailform">
              <form onSubmit={this.handleSubmit}>
                <div className={this.state.validInputs.to ? "form-group" : "form-group has-danger"}>
                  <input type="text" className="form-control" name="to" id="to" aria-describedby="to" placeholder="To" value={this.state.to} onChange={this.handleChange} required />
                </div>
                <div className={this.state.validInputs.cc ? "form-group" : "form-group has-danger"}>
                  <input type="text" className="form-control" name="cc" id="cc" aria-describedby="cc" placeholder="CC" value={this.state.cc} onChange={this.handleChange} />
                </div>
                <div className={this.state.validInputs.bcc ? "form-group" : "form-group has-danger"}>
                  <input type="text" className="form-control" name="bcc" id="bcc" aria-describedby="bcc" placeholder="BCC" value={this.state.bcc} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="subject" id="subject" aria-describedby="subject" placeholder="Subject" value={this.state.subject} onChange={this.handleChange} maxLength="100" required />
                </div>
                <div className="form-group">
                  <textarea className="form-control" name="message" id="message" placeholder="Message" rows="8" onChange={this.handleChange} required></textarea>
                </div>
                <div className={this.state.attachedImages.length > 0 ? "attached-images" : "attached-images hidden"}>
                  <p>Attached files</p>
                  <div className="container">
                    <div className="row images-preview">
                      {this.state.attachedImages.map(function (image, i) {
                        return <div className="image-preview" key={image.id}>
                          <img alt={image.name} src={image}/>
                          <button type="button" className="btn btn-primary" index={i} onClick={this.deleteAttachedImage.bind(this)}>
                            <i className="fa fa-trash" index={i}></i>
                          </button>
                        </div>;
                      }, this)}
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="form-group image-upload">
                      <label htmlFor="images">
                        <i className="fa fa-paperclip btn btn-primary"></i>
                      </label>
                      <input type="file" className="form-control" name="images" id="images" aria-describedby="images" onChange={this.handleImageUpload} accept="image/*" multiple />
                    </div>
                    <button className="btn btn-info btn-send ml-auto" type="submit" disabled={!this.state.validToSend}>
                      <i className="fa fa-arrow-right"></i>
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default EmailForm;
