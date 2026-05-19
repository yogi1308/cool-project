import { SendIcon } from "../assets/Icons.tsx";

export default function ChatNode() {
    return (
        <div className="border border-acc rounded-sm p-2 flex flex-col text-white overflow-hidden">
            <div className="chat">
            </div>
            <div className="message flex flex-row gap">
                <p>+</p>
                <textarea name="prompt" id="prompt" />
                <SendIcon />
            </div>
        </div>
    )
}
