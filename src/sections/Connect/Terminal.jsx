import { useState, useRef, useEffect } from 'react'
import styles from './Terminal.module.css'

function Terminal({ height }) {
  const [input, setInput] = useState('')
  const [logs, setLogs] = useState([
    'For the madlads who wanna do it the git way',
    "Type 'info' to see how it works",
  ])
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isPushing, setIsPushing] = useState(false)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  useEffect(() => {
    const scrollToBottom = () => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }
    scrollToBottom()
    const timer = setTimeout(scrollToBottom, 50)
    return () => clearTimeout(timer)
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
    const addRegex = /^git add (?:\. )?"(.*)"$/
    const commitRegex = /^git commit -m "(.*)"$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (cmd === 'clear' || cmd === 'cls') {
      setLogs([
        'For the madlads who hate buttons',
        "Type 'info' to see how it works",
      ])
      setMessage('')
      setEmail('')
      setSubmitted(false)
    } else if (cmd === 'whoami') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'You are a curious human exploring my corner of the internet.',
      ])
    } else if (cmd === 'ls' || cmd === 'dir' || cmd === 'ls -la' || cmd === 'ls -a') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        '',
        'projects/          blogs/',
        'coffee_stash.env   node_modules/',
        'brain.exe          overthinking/',
      ])
    } else if (cmd === ':wq' || cmd === ':q' || cmd === ':q!' || cmd === ':x') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        '',
        'Saving changes...',
        '',
        'Done.',
        '',
        'Wait.',
        '',
        "This isn't Vim.",
        'You actually can leave.',
      ])
    } else if (
      cmd === 'rm -rf /' ||
      cmd === 'rm -rf /*' ||
      cmd === 'rm -rf' ||
      cmd === 'sudo rm -rf /' ||
      cmd === 'sudo rm -rf /*' ||
      cmd === 'sudo rm -rf'
    ) {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        "Security policy: Don't let visitors destroy the portfolio.",
      ])
    } else if (cmd === 'sudo' || cmd.startsWith('sudo')) {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'Nice try. lol.',
      ])
    } else if (cmd === 'contact') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'Email: ritesh.exe@proton.me / riteshjha.exe@gmail.com',
      ])
    } else if (cmd === 'git status' || cmd === 'status') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        `Email:   ${email ? `"${email}" (staged)` : 'Not set (use: git add "your@email.com")'}`,
        `Message: ${message ? `"${message}" (staged)` : 'Not set (use: git commit -m "your message")'}`,
      ])
    } else if (cmd === 'vim' || cmd === 'vi') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        "Entering Vim... Just kidding, I wouldn't trap you like that. Use nano.",
      ])
    } else if (cmd === 'nano') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'A person of culture! Real ones use nano without shame.',
      ])
    } else if (cmd === 'exit' || cmd === 'quit') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'There is no exit. You live here now (or just close the tab)',
      ])
    } else if (cmd === 'sl') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'lmao, you meant ls didn\'t you?',
      ])
    } else if (cmd.startsWith('cat')) {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        cmd.includes('secret') || cmd.includes('flag') || cmd.includes('.env')
          ? 'NICE_TRY{h4ck3r_bwt_n0_fl4g_h3r3}'
          : 'Meow! What did you expect?',
      ])
    } else if (cmd.startsWith('cd')) {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'Cannot cd: You are already at root (/ritesh/portfolio) and there is no escape.',
      ])
    } else if (cmd === 'git push --force' || cmd === 'git push -f') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'Force pushing to main? What kind of chaos demon are you?',
      ])
    } else if (cmd === 'git blame') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'git blame: 100% of bugs written by Ritesh. But hey, it compiles!',
      ])
    } else if (cmd === 'git log') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'commit 7f3a9b - feat: drank 4 cups of coffee',
        'commit 4a2c1e - fix: why is this not working',
        'commit 1b0e8d - chore: pushed straight to prod on a Friday',
      ])
    } else if (cmd === 'top' || cmd === 'htop') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'CPU: 99% Overthinking',
        '',
        'RAM: 15.9 GB eaten by Chrome',
        '',
        'Tasks: 1 Procrastinating',
      ])
    } else if (cmd.startsWith('ping')) {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        '64 bytes from ritesh: icmp_seq=1 ttl=64 time=0.42 ms (still alive & coding)',
      ])
    } else if (cmd === 'matrix' || cmd === 'cmatrix') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        'Wake up, Neo... The Matrix has you.',
      ])
    } else if (cmd === 'curl' || cmd.startsWith('curl')) {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        "HTTP/1.1 418 I'm a teapot",
      ])
    } else if (cmd === 'info' || cmd === 'help') {
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        '',
        'SEND MESSAGE:',
        '  1. git add "aapka@email.com"',
        '  2. git commit -m "your message here"',
        '  3. git push origin main',
        '',
        'OTHER COMMANDS:',
        '  clear       - Reset terminal',
        '  git status  - Check staged message',
        '  contact     - Display contact email',
        '  whoami      - Who are you?',
        '',
        '(psst... try sudo, ls, :wq, htop, sl, rm -rf..., try wtv u know lol)',
        '',
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
        `Email added: "${mail}"`,
      ])
    } else if (commitRegex.test(cmd)) {
      const msg = cmd.match(commitRegex)[1]

      setMessage(msg)
      setLogs((prevLogs) => [
        ...prevLogs,
        <span className={styles.userCommand}>$ {cmd}</span>,
        `Message committed: "${msg}"`,
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
          'Message successfully shipped!',
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
    <div
      className={styles.terminal}
      ref={terminalRef}
      tabIndex={0}
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      style={height ? { height: `${height}px`, maxHeight: `${height}px`, minHeight: `${height}px` } : undefined}
      onClick={() => {
        inputRef.current?.focus()
      }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
      {!submitted && !isPushing && (
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
