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
  const [isPushing, setIsPushing] = useState(false)
  const inputRef = useRef(null)
  const sectionRef = useRef(null)
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
    const addRegex = /^git add "(.*)"$/
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
    } else if (cmd === 'resume') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'Opening resume...',
      ])

      setTimeout(() => {
        window.open(
          'https://drive.google.com/file/d/1jibFZhfrJS4Gw1x0uGeKMYJMOUbLBNAp/view?usp=sharing',
          '_blank'
        )
      }, 500)
    } else if (cmd === 'contact') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'Email: riteshjha2174@gmail.com / ritesh.exe@proton.me',
      ])
    } else if (cmd === 'info') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'Use the following commands to send me a message:',
        '1) git add "your email"',
        '2) git commit -m "your message"',
        '3) git push origin main',
        '',
        'Other commands:',
        '▶ resume - To view my resume',
        '▶ contact - To view my contact email',
        '▶ clear - To reset terminal',
      ])
    } else if (addRegex.test(cmd)) {
      const mail = cmd.match(addRegex)[1]

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
        `✔ Email added: "${mail}"`,
      ])
    } else if (commitRegex.test(cmd)) {
      const msg = cmd.match(commitRegex)[1]

      setMessage(msg)
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        `✔ Message committed: "${msg}"`,
      ])
    } else if (cmd === 'git push origin main') {
      if (message && email) {
        setIsPushing(true)
        setLogs((prevLogs) => [
          ...prevLogs,
          <span className={styles.userCommand}>$ {cmd}</span>,
          'Pushing to origin... (shipping message)',
        ])
        sendFormData()
      } else {
        const missing = []
        if (!email) missing.push('email')
        if (!message) missing.push('message')
        setLogs((prevLogs) => [
          ...prevLogs,
          <span className={styles.userCommand}>$ {cmd}</span>,
          `Please provide ${missing.join(' and ')} first! Use 'info' for commands.`,
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
        setIsPushing(false)
        setLogs((prevLogs) => [
          ...prevLogs,
          '✔ Message successfully shipped!!!',
        ])
      } else {
        setIsPushing(false)
        setLogs((prevLogs) => [
          ...prevLogs,
          'Failed to ship message. Try again later.',
        ])
      }
    } catch (error) {
      setIsPushing(false)
      setLogs((prevLogs) => [...prevLogs, 'Network error. Please try again.'])
    }
  }

  return (
    <section id='contact' className={styles.container} ref={sectionRef}>
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
        {!submitted && !isPushing && (
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
