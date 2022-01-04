import React from 'react';
//import { Label, CustomInput } from 'reactstrap';
//import SelectSearch from 'react-select-search';
import {clgnames} from './collegenames.js'
import Checkbox from "./Checkbox";
import ReactSearchBox from 'react-search-box'
import Saarang_logo_1 from './Saarang 2022 Logo-02.png'
import './Registration.css';

const OPTIONS = [<div>Classical Night</div>, <div>Indie Night</div>, <div>Pop Night</div>, <div>World Fest</div>, <div>Rock Night</div>];
const validNameRegex=RegExp(/^[A-Za-z]+$/);
const validMobileRegex=RegExp(/^[0-9]{10}$/);
const validPincodeRegex=RegExp(/^[1-9][0-9]{5}$/)
const validateForm = (errors) => {
let valid = true;
Object.values(errors).forEach(
  // if we have an error string set valid to false
  (val) => val.length > 0 && (valid = false)
);
return valid;
}
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    fullName: null,
    CollegeName:null,
    Gender:null,
    Mobile: null,
    Address: null,
    City:null,
    Pincode:null,
    errors: {
      fullName: '',
      CollegeName:'',
      Gender:'',
      Mobile:'',
      Address: '',
      City: '',
      Pincode:'',
    },
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
  };
    this.GenderValuechange = this.GenderValuechange.bind(this);
  }

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  GenderValuechange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // console.log(event.target.value)
    switch (name) {
      case 'fullName':
        errors.fullName =
          validNameRegex.test(value) && value.length>4
            ? ''
            : 'Invalid Name or Name is short';
        break;
        case 'City':
          errors.City =
            validNameRegex.test(value) && value.length>2
              ? ''
              : 'Lost city';
          break;
      case 'Mobile':
        errors.Mobile =
          validMobileRegex.test(value)
            ? ''
            : 'Invalid number';
        break;

      case 'Pincode':
        errors.Pincode =
          validPincodeRegex.test(value)
            ? ''
            : 'Improper pincode';
          break;

      default:
        break;
    }
    this.setState({errors, [name]: value}, ()=> {
            console.log(errors)

        })
  }


  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.log("Success")
    }else
    {
    console.error('Invalid Form')
    alert("INVALID FORM")
    }
  }

  render() {
    const {errors}=this.state
    return(
      <div className="wrapper">
        <img src={Saarang_logo_1} alt="Saarang Logo" className='Saarang_logo_1' />
          <form className="form" onSubmit={this.handleSubmit.bind(this)} noValidate >
            <div className='contentDiv'>
            <div className='leftDiv'>
              <div className='fullName'>
                      <label htmlFor="fullName">Full Name</label><br/>
                      <div className='iAmAColumn'>
                      <input type='text' name='fullName' onChange={this.handleChange} noValidate placeholder=""/>
                      {errors.fullName.length > 0 && <span className='error'>{errors.fullName}</span>}
                      </div>
              </div>
              <div className="CollegeName">
                <label htmlFor="CollegeName">College Name</label>
                <div className='CollegeNameDiv'>
                  <ReactSearchBox className="CollegeNameBox"
                    placeholder="Select your college"
                    data={clgnames}
                    onSelect={record => console.log(record)}
                    onFocus={() => {
                      // console.log('This function is called when is focussed')
                    }}
                    onChange={value => console.log(value)}
                    fuseConfigs={{
                      threshold: 0.05,
                    }}
                    inputBoxFontColor="black"
                    // dropDownHoverColor="black"
                    />
                </div>
              </div>
              <div className="genderDiv">
              <label id='genderName' htmlFor="Gender">Gender</label>
                <div className='genderDivRadio'>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Male"
                        checked={this.state.selectedOption === "Male"}
                        onChange={this.GenderValuechange}
                      />
                      Male
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                    <input
                      type="radio"
                      value="Female"
                      checked={this.state.selectedOption === "Female"}
                      onChange={this.GenderValuechange}
                    />
                    Female
                  </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Other"
                        checked={this.state.selectedOption === "Other"}
                        onChange={this.GenderValuechange}
                      />
                      Other
                    </label>
                  </div>
                </div>
              </div>

              <div className="Mobile">
                <label htmlFor="Mobile">Mobile</label>
                <div className='iAmAColumn'>
                  <input type="text" pattern="[0-9]" maxLength="10" name="Mobile"  onChange={this.handleChange} noValidate/>
                  {errors.Mobile.length > 0 && <span className='error'>{errors.Mobile}</span>}
                </div>
              </div>
            </div>

              <div className='rightDiv'>
                <div className='Address'>
                  <label htmlFor="Address">Address</label>
                  <textarea name="Address" rows="4" cols="5" placeholder=""></textarea>
                </div>


                <div className='City'>
                  <label htmlFor="City">City</label><br/>
                  <div className='iAmAColumn'>
                    <input type='text' name='City' onChange={this.handleChange} noValidate />
                    {errors.City.length > 0 && <span className='error'>{errors.City}</span>}
                  </div>
                </div>
                <div className='Pincode'>
                  <label htmlFor="Pincode">Pincode</label><br/>
                  <div className='iAmAColumn'>
                      <input type='number' name='Pincode' onChange={this.handleChange} noValidate/>
                      {errors.Pincode.length > 0 && <span className='error'>{errors.Pincode}</span>}
                  </div>
                </div>
                </div>
            </div>
            
            <div className='bottomDiv'>
              <div className='proshowsText'>
                <h1>------ Proshows ------</h1>
              </div>
              <div className='eventsCheckbox'>
                {this.createCheckboxes()}
              </div>
            
              <div className='submit'>
                <button className='submitButton'>Submit</button>
              </div>
            </div>
          </form>

      </div>
    )
  }
}
export default Register;