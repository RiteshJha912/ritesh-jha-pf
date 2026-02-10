import { useState, useRef, useEffect } from 'react'
import styles from './Terminal.module.css'

function Terminal() {
  const [input, setInput] = useState('')
  const [logs, setLogs] = useState([
    'For the madlads who wanna do it the git way',
    "Type 'info' to see how it works",
  ])
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }

    const preventScroll = (e) => {
      if (terminalRef.current && terminalRef.current.contains(e.target)) {
        e.stopPropagation()
      }
    }

    document.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      document.removeEventListener('touchmove', preventScroll)
    }
  }, [logs])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      processCommand(input.trim().toLowerCase())
      setInput('')
    }
  }

  const processCommand = (cmd) => {
    const addRegex = /^git add \. "(.*)"$/
    const commitRegex = /^git commit -m "(.*)"$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (cmd === 'clear') {
      setLogs([
        'For the madlads who wanna do it the git way',
        "Type 'info' to see how it works",
      ])
      setMessage('')
      setEmail('')
      setSubmitted(false)
    } else if (cmd === 'info') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        '',
        'SEND MESSAGE:',
        '  1. git add . "your message here"',
        '  2. git commit -m "your@email.com"',
        '  3. git push origin main',
        '',
        'OTHER COMMANDS:',
        '  clear  - Reset terminal',
        '',
      ])
    } else if (addRegex.test(cmd)) {
      const msg = cmd.match(addRegex)[1]
      setMessage(msg)
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        `✔ Message added: "${msg}"`,
      ])
    } else if (commitRegex.test(cmd)) {
      const mail = cmd.match(commitRegex)[1]

      if (!emailRegex.test(mail)) {
        setLogs((prevLogs) => [
          ...prevLogs,
          <span className={styles.userCommand}>$ {cmd}</span>,
          'Invalid email format! Please enter a valid email.',
        ])
        return
      }

      setEmail(mail)
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        `✔ Email set: "${mail}"`,
      ])
    } else if (cmd === 'git push origin main') {
      if (message && email) {
        sendFormData()
      } else {
        setLogs((prevLogs) => [
          ...prevLogs,
          <span className={styles.userCommand}>$ {cmd}</span>,
          'Please add message and email first!',
        ])
      }
    } else {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        "Invalid command. Try 'info' for help.",
      ])
    }
  }

  const sendFormData = async () => {
    try {
      const response = await fetch('https://formspree.io/f/xjkbkwnn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, email }),
      })

      if (response.ok) {
        setSubmitted(true)
        setLogs((prevLogs) => [
          ...prevLogs,
          ' Message successfully sent!!! ',
        ])
      } else {
        setLogs((prevLogs) => [
          ...prevLogs,
          'Failed to send message. Try again later.',
        ])
      }
    } catch (error) {
      setLogs((prevLogs) => [...prevLogs, 'Network error. Please try again.'])
    }
  }

  return (
    <div
      className={styles.terminal}
      ref={terminalRef}
      onClick={() => {
        inputRef.current?.focus()
      }}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
      {!submitted && (
        <form onSubmit={(e) => e.preventDefault()}>
          <span className={styles.prompt}>$</span>
          <input
            type='text'
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className={styles.terminalInput}
            ref={inputRef}
            autoComplete="off"
          />
        </form>
      )}
    </div>
  )
}

export default Terminal
