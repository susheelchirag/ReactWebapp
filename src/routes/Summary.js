import React, { Component } from 'react'
import { connect } from 'react-redux'

class Summary extends Component {
  renderRow (item, index) {
    const { id, joke, rating } = item
    return [
      <tr key={index}>
        <th scope='row'>{id}</th>
        <td>{joke}</td>
        <td>{rating}</td>
      </tr>
    ]
  }
  render () {
    const jokes = this.props.ratedJokes
    return [
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Joke</th>
              <th scope='col'>Rating</th>
            </tr>
          </thead>
          <tbody>
            {jokes.length > 0
              ? jokes.map((item, index) => this.renderRow(item, index))
              : <tr><td>NO Data</td></tr>}
          </tbody>
        </table>
      </div>
    ]
  }
}

const s = state => ({
  ratedJokes: state.jokes.ratedJokes
})

// d function
const d = dispatch => ({})

export default connect(s, d)(Summary)
