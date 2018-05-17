import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchJoke, rateJoke } from 'models/jokes'
import logo from '../logo.svg'
import '../App.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.rateJoke = this.rateJoke.bind(this)
  }
  componentDidMount () {
    this.props.fetchJoke()
  }
  rateJoke (e) {
    const { current } = this.props
    const text = e.currentTarget.value
    this.props.rateJoke({id: current.id, joke: current.joke, rating: text})
    this.props.fetchJoke()
  }
  render () {
    const { current } = this.props
    return (
      <div className='App'>
        <header className='App-header'>
          <Link to='/summary'>Summary</Link>
        </header>
        <div className='App-intro'>
          {current && <div>
            <p id={current.id}>{current.joke}</p>
            <button onClick={this.rateJoke} value='Funny'>Funny</button>
            <button onClick={this.rateJoke} value='NotFunny'>Not Funny</button>
          </div>
          }
        </div>
      </div>
    )
  }
}

const s = state => ({
  current: state.jokes.current
})

// d function
const d = dispatch => ({
  fetchJoke: () => dispatch(fetchJoke()),
  rateJoke: (payload) => dispatch(rateJoke(payload))
})

export default connect(s, d)(Home)
