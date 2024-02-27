import React, { useEffect } from "react";
import { io } from "socket.io-client";
// @ts-ignore
import { dream_weaver_backend } from "declarations/dream_weaver_backend";
import { useParams } from "react-router-dom";

function TestSocketPage() {
    const { name } = useParams()
    const socket = io("http://localhost:8888", { query: { name } });

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-message', donation => {
            console.log(donation)
        })
    }, [socket]);

    return (
        <>
            <div className=""></div>
        </>
    );
}

export default TestSocketPage;
