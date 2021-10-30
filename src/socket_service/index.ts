import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { isClient } from './middlewares/isClient'
import { isServer } from './middlewares/isServer'
const httpServer = createServer(express())

export const io = new Server(httpServer)
export const server = io.of('/server')
export const client = io.of('/client')

isClient(client)
isServer(server)

client.on('connection', async (socket) => {})

server.on('connection', (socket) => {
    console.log('server connected')
})

httpServer.listen(3005)
