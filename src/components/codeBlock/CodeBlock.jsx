import React, { useState } from 'react'
import { FaRegCopy } from "react-icons/fa6"
import { IoMdDoneAll } from "react-icons/io"
import copy from 'copy-to-clipboard'
import styles from './codeblock.module.css'

const CodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false)
    const handleCopyBtnClick = () => {
        if (copied) return
        copy(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 10000)
    }
    return (
        <div className={styles.container} onClick={handleCopyBtnClick}>
            <span className={styles.text}>{copied ? "Code copied!" : "Copy your code"}</span>
            <span className={styles.icon}>{copied ? <IoMdDoneAll /> : <FaRegCopy />}</span>
        </div>
    );
};

export default CodeBlock;
