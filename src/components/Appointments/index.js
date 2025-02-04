import { Component } from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
    state = {
        appointmentsList: [],
        title: '',
        date: '',
        isFilterActive: false,
    }

    onChangeTitle = event => {
        this.setState({title: event.target.value})
    }

    onChangeDate = event => {
        this.setState({date: event.target.value})
    }

    onAddAppointment = (event) => {
        event.preventDefault()
        const {title, date} = this.state
        const formattedDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''

        const newAppointment = {
            id: uuidv4(),
            title,
            date: formattedDate,
            isStarred: false,
        }

        this.setState(prevState => ({
            appointmentsList: [...prevState.appointmentsList, newAppointment],
            name: '',
            date: '',
        }))
    }

    toggleIsStarred = id => {
        this.setState(prevState => ({
            appointmentsList: prevState.appointmentsList.map(eachAppointment => {
                if (eachAppointment.id === id) {
                    return {...eachAppointment, isStarred: !eachAppointment.isStarred}
                }
                return eachAppointment
            })
        }))
    }

    onFilter = () => {
        const {isFilterActive} = this.state
        this.setState({isFilterActive: !isFilterActive,})
    }

    getFilteredAppointmentsList = () => {
        const {appointmentsList, isFilterActive} = this.state
        if (isFilterActive) {
            return appointmentsList.filter(
                eachTransaction => eachTransaction.isStarred === true,
            )
        }
        return appointmentsList
    }

    render(){
        const {isFilterActive, title, date} = this.state
        const filteredAppointmentsList = this.getFilteredAppointmentsList()
        const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
        
        return (
            <div className="app-container">
              <div className="responsive-container">
                <div className="appointments-container">
                  <div className="add-appointment-container">
                    <form className="form" onSubmit={this.onAddAppointment}>
                      <h1 className="add-appointment-heading">Add Appointment</h1>
                      <label htmlFor="title" className="label">
                        TITLE
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="input"
                        onChange={this.onChangeTitle}
                        value={title}
                        placeholder="Title"
                      />
                      <label htmlFor="date" className="label">
                        DATE
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="input"
                        onChange={this.onChangeDate}
                        value={date}
                      />
                      <button type="submit" className="add-button">
                        Add
                      </button>
                    </form>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                      alt="appointments"
                      className="appointments-img"
                    />
                  </div>
                  <hr className="hr" />
                  <div className="header-with-filter-container">
                    <h1 className="appointments-heading">Appointments</h1>
                    <button
                      type="button"
                      className={`filter-style ${filterClassName}`}
                      onClick={this.onFilter}
                    >
                      Starred
                    </button>
                  </div>
                  <ul className="appointments-list">
                    {filteredAppointmentsList.map(eachAppointment => (
                      <AppointmentItem
                        key={eachAppointment.id}
                        appointmentDetails={eachAppointment}
                        toggleIsStarred={this.toggleIsStarred}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
    }
}
export default Appointments