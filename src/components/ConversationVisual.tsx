'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function ConversationVisual({ start = false }: { start?: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  const messages = [
    { id: 1, type: 'user', text: 'I need a weekly shop for 2 adults and 2 children' },
    { id: 2, type: 'handshake', text: 'Any dietary preferences this week?' },
    { id: 3, type: 'user', text: 'High protein, no mushrooms' },
    { id: 4, type: 'handshake', text: 'The usual budget - 2000 NOK?' },
    { id: 5, type: 'user', text: 'Yes!' },
    { id: 6, type: 'handshake', text: 'Done! Arriving tomorrow at 6pm' },
  ]
  const [revealedMessages, setRevealedMessages] = useState([] as typeof messages)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showTyping, setShowTyping] = useState(false)

  // Updated URLs for images from GitHub
  const handshakeLogoUrl =
    'https://raw.githubusercontent.com/sillysausage-eth/handshake/Dev-onboarding/src/images/logos/Logo%20Blue.png'
  const julieAvatarUrl =
    'https://raw.githubusercontent.com/sillysausage-eth/handshake/Dev-onboarding/src/images/avatars/Julie.png'

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.5,
        delayChildren: 0.3,
      },
    },
  }
  const messageVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  }
  const deviceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1,
      },
    },
  }
  const typingVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  // Animation logic
  useEffect(() => {
    if (!start) return
    if (currentIndex < messages.length) {
      setShowTyping(true)
      const typingTimer = setTimeout(() => {
        setShowTyping(false)
        setRevealedMessages((prev) => [...prev, messages[currentIndex]])
        setCurrentIndex((i) => i + 1)
      }, 1200)
      return () => clearTimeout(typingTimer)
    }
  }, [start, currentIndex, messages])

  // Reset animation if remounted or start changes
  useEffect(() => {
    setRevealedMessages([])
    setCurrentIndex(0)
    setShowTyping(false)
  }, [start])

  // Next message type for typing indicator
  const nextMessageType = messages[currentIndex]?.type

  return (
    <motion.div
      className="relative w-full max-w-[500px] mx-auto flex items-start justify-center h-auto [transform-style:flat]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ transform: 'none' }}
    >
      {/* Container frame without tilt */}
      <motion.div
        className="relative mx-auto w-full [transform-style:flat]"
        variants={deviceVariants}
        style={{ rotate: 0, transform: 'none' }}
      >
        {/* Container with shadow instead of phone frame */}
        <div className="rounded-lg bg-white shadow-lg ring-1 ring-gray-200 p-4 relative overflow-hidden h-[500px]">
          {/* Chat content */}
          <div className="bg-gray-50 overflow-hidden rounded-lg h-full flex flex-col">
            {/* Chat header */}
            <div className="bg-white border-b border-gray-200 py-2.5 px-3.5 flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-3">
                <img
                  src={handshakeLogoUrl}
                  alt="Handshake"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm">Handshake</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            {/* Chat interface */}
            <div className="p-3 space-y-3 overflow-y-auto flex-1 flex flex-col justify-center">
              {revealedMessages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex items-center gap-3 ${
                    message.type === 'handshake' ? 'justify-end' : ''
                  }`}
                  initial="hidden"
                  animate="visible"
                  variants={messageVariants}
                >
                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={julieAvatarUrl}
                        alt="Julie"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`px-4 py-2.5 rounded-lg max-w-[75%] ${
                      message.type === 'handshake'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  {message.type === 'handshake' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={handshakeLogoUrl}
                        alt="Handshake"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator for next message */}
              {showTyping && nextMessageType && (
                <motion.div
                  className={`flex items-center gap-3 ${
                    nextMessageType === 'handshake' ? 'justify-end' : ''
                  }`}
                  initial="hidden"
                  animate="visible"
                  variants={typingVariants}
                >
                  {nextMessageType === 'user' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={julieAvatarUrl}
                        alt="Julie"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`px-4 py-2.5 rounded-lg max-w-[75%] ${
                      nextMessageType === 'handshake'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    } flex items-center gap-1.5`}
                  >
                    <span className="block w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0s]"></span>
                    <span className="block w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.15s]"></span>
                    <span className="block w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  </div>
                  {nextMessageType === 'handshake' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={handshakeLogoUrl}
                        alt="Handshake"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 