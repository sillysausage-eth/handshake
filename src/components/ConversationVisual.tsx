'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import handshakeLogo from '@/images/logos/handshake-icon.svg'

export function ConversationVisual() {
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const [showTypingIndicator, setShowTypingIndicator] = useState(false)
  const [showLastMessage, setShowLastMessage] = useState(false)
  
  // Show component after a small delay to ensure smooth animation
  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    
    // Show typing indicator after messages have appeared
    const typingTimer = setTimeout(() => {
      setShowTypingIndicator(true)
    }, 2500)
    
    // Show last message after typing
    const lastMessageTimer = setTimeout(() => {
      setShowTypingIndicator(false)
      setShowLastMessage(true)
    }, 4000)
    
    return () => {
      clearTimeout(visibilityTimer)
      clearTimeout(typingTimer)
      clearTimeout(lastMessageTimer)
    }
  }, [])
  
  // Animation variants for messages appearing sequentially
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.4,
        delayChildren: 0.3
      }
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
  
  // Device frame animation
  const deviceVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut", 
        delay: 0.1 
      }
    }
  }
  
  // Typing indicator animation
  const typingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  }
  
  const messages = [
    { 
      id: 1, 
      type: 'user', 
      text: 'I need a weekly shop for 5' 
    },
    { 
      id: 2, 
      type: 'handshake', 
      text: 'Any dietary preferences this week?' 
    },
    { 
      id: 3, 
      type: 'user', 
      text: 'High protein, no mushrooms' 
    },
    { 
      id: 4, 
      type: 'handshake', 
      text: 'The usual budget - 2000 NOK?' 
    },
    { 
      id: 5, 
      type: 'user', 
      text: 'Yes!' 
    }
  ]
  
  // Last message that appears after typing indicator
  const lastMessage = {
    id: 6, 
    type: 'handshake', 
    text: 'Done! Arriving tomorrow at 6pm'
  }

  return (
    <motion.div 
      className="relative max-w-md mx-auto flex items-start justify-center h-auto [transform-style:flat]"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      style={{ transform: 'none' }}
    >
      {/* Container frame without tilt */}
      <motion.div 
        className="relative mx-auto w-full max-w-[600px] [transform-style:flat]"
        variants={deviceVariants}
        style={{ rotate: 0, transform: 'none' }}
      >
        {/* Container with shadow instead of phone frame */}
        <div className="rounded-lg bg-white shadow-lg ring-1 ring-gray-200 p-4 relative overflow-hidden h-[550px]">
          {/* Chat content */}
          <div className="bg-gray-50 overflow-hidden rounded-lg h-full flex flex-col">
            {/* Chat header */}
            <div className="bg-white border-b border-gray-200 py-2.5 px-3.5 flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 p-1.5 flex-shrink-0 mr-3">
                <Image 
                  src={handshakeLogo}
                  alt="Handshake" 
                  width={20}
                  height={20}
                  className="w-full h-full"
                />
              </div>
              <div>
                <p className="font-medium text-sm">Handshake Assistant</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            {/* Chat interface */}
            <div className="p-3 space-y-3 overflow-y-auto flex-1">
              {messages.map((message) => (
                <motion.div 
                  key={message.id}
                  className={`flex items-end gap-3 ${message.type === 'handshake' ? 'justify-end' : ''}`}
                  variants={messageVariants}
                >
                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
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
                    <div className="w-8 h-8 rounded-full bg-blue-600 p-1.5 flex-shrink-0">
                      <Image 
                        src={handshakeLogo}
                        alt="Handshake" 
                        width={20} 
                        height={20}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {showTypingIndicator && (
                <motion.div 
                  className="flex items-end gap-3 justify-end"
                  initial="hidden"
                  animate="visible"
                  variants={typingVariants}
                >
                  <div className="px-4 py-2.5 rounded-lg bg-blue-600 rounded-br-none flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div 
                        key={i}
                        initial={{ y: 0 }}
                        animate={{ 
                          y: [0, -3, 0],
                          transition: {
                            repeat: Infinity,
                            duration: 0.8,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: i * 0.15
                          }
                        }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    ))}
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-blue-600 p-1.5 flex-shrink-0">
                    <Image 
                      src={handshakeLogo}
                      alt="Handshake" 
                      width={20} 
                      height={20}
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              )}
              
              {/* Last message that appears after typing */}
              {showLastMessage && (
                <motion.div 
                  className={`flex items-end gap-3 justify-end`}
                  initial="hidden"
                  animate="visible"
                  variants={messageVariants}
                >
                  <div 
                    className="px-4 py-2.5 rounded-lg max-w-[75%] bg-blue-600 text-white rounded-br-none"
                  >
                    <p className="text-sm">{lastMessage.text}</p>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-blue-600 p-1.5 flex-shrink-0">
                    <Image 
                      src={handshakeLogo}
                      alt="Handshake" 
                      width={20} 
                      height={20}
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 