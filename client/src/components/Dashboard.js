import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions'

class Dashboard extends Component{
    componentDidMount(){
        this.props.fetchSurveys()
    }
    renderSurveys = () => {
        let surveys = this.props.surveys;
        if(surveys){
        let surveyArray = surveys.map((survey) => {
            return (
                <div className="row">
                <div className='card'>
                <div className='card-content'>
                    <h6>{survey.title}</h6>
                    <p>{survey.body}</p>
                    <p>Yes: {survey.yes}</p>
                    <p>No: {survey.no}</p>
                    <p>Survey sent on: {survey.dateSend}</p>
                    </div>
                    </div>
                </div>
            )
        })
        return surveyArray
        } else {
            return(<div>Loading...</div>)
        }
    }
    render(){
    return (
        <div>
           <h2> Dashboard </h2>
           {this.renderSurveys()}
            <div className="fixed-action-btn">
            <Link to='/surveys/new' className='btn-floating btn-large red'>
            <i className='material-icons'>add</i>
            </Link>
            </div>
        </div>
    )}
}

 const mapStateToProps = ({surveys}) =>{
    return{surveys}
}
export default connect(mapStateToProps, actions)(Dashboard);