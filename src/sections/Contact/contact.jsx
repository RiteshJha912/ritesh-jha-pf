import { useState, useRef, useEffect } from 'react'
import styles from './contactStyles.module.css'

function Contact() {
  const [input, setInput] = useState('')
  const [logs, setLogs] = useState([
    'Wanna drop a message for me?',
    "Type 'info' to know the git commands",
  ])
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef(null)
  const sectionRef = useRef(null)
  const terminalRef = useRef(null)


  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
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
        'Wanna drop a message for me?',
        "Type 'info' to know the git commands",
      ])
      setMessage('')
      setEmail('')
      setSubmitted(false)
    } else if (cmd === 'info') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'Use the following commands:',
        '1) git add . "your message"',
        '2) git commit -m "your email"',
        '3) git push origin main',
        'clear (to Reset terminal)',
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
          '🔥 Message successfully sent!!! 🔥',
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
    <section id='contact' className={styles.container} ref={sectionRef}>
      <div
        className={styles.terminal}
        ref={terminalRef}
        onClick={() => inputRef.current?.focus()} 
      >
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
        {!submitted && (
          <form>
            <span className={styles.prompt}>$</span>
            <input
              type='text'
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className={styles.terminalInput}
              ref={inputRef}
            />
          </form>
        )}
      </div>
    </section>
  )
}

export default Contact
