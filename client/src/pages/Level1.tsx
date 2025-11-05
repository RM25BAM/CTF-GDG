import React, { useEffect, useState } from "react";
import Windows from "../assets/windows87.png";
import Bin from "../assets/Recycle Bin (full).png";
import Explorer from "../assets/Internet Explorer 6.png";
import paint from "../assets/Paint.png";
import wLogo from "../assets/wXP.png";
import clock from "../assets/Date and Time.png";
import cmd from "../assets/Command Prompt.png";
import { useNavigate } from "react-router-dom";

const encodedPassword = "cGllZFBpcGVyLk5ldA=="; // base64 -> devs should NOT ship this :)

const Level1: React.FC = () => {
  const navigate = useNavigate();
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [terminalMode, setTerminalMode] = useState<"user" | "pass" | "done">("user");
  const [input, setInput] = useState("");
 // easter egg
  useEffect(() => {
    console.log(
      "%cWelcome to Windows XP — right click > View Page Source ;)",
      "color: #00AEEF; font-weight:bold;"
    );
    console.log(
      "%cPsst. Some dev left a suspicious base64 string in the bundle: %s",
      "color:#22c55e;",
      encodedPassword
    );
  }, []);

  const openTerminal = () => {
    setTerminalOpen(true);
    setTerminalMode("user");
    setInput("");
    setTerminalLines([
      "Microsoft Windows XP [Version 5.1.2600]",
      "(C) Copyright 1985-2001 Microsoft Corp.",
      "",
      "secure_login.bat",
      "",
      "login: ",
    ]);
  };

  const handleTerminalSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setTerminalLines(prev => {
      const updated = [...prev];
      if (terminalMode === "user") {
        updated[updated.length - 1] = `login: ${trimmed}`;
        if (trimmed === "Admin") {
          updated.push("password: ");
          setTerminalMode("pass");
        } else {
          updated.push("login failed: unknown user", "", "login: ");
        }
      } else if (terminalMode === "pass") {
        // Don't print raw password, mimic hidden entry
        updated[updated.length - 1] = "password: ********";
        const decoded = atob(encodedPassword);
        if (trimmed === decoded) {
          updated.push(
            "",
            "ACCESS GRANTED.",
            "hint: real secrets are often hiding in plain HTML.",
            "try looking at what the browser actually loaded...",
            ""
          );
          setTerminalMode("done");
          navigate("/level2");
        } else {
          updated.push("ACCESS DENIED.", "", "login: ");
          setTerminalMode("user");
        }
      } else {
        updated.push(`> ${trimmed}`);
      }
      return updated;
    });
    setInput("");
  };

  return (
    <main className="overflow-hidden min-h-screen flex flex-col bg-[#008080] relative">
      {/* --- Hidden Flag Comment --- */}
      <div
        aria-hidden="true"
        dangerouslySetInnerHTML={{
          __html: "<!-- FLAG: GGCAMP{Admin} -->",
        }}
      />

      {/* --- XP Wallpaper --- */}
      <img
        src={Windows}
        alt="Windows XP Wallpaper"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* --- Desktop Icons --- */}
      <div className="absolute top-6 left-6 flex flex-col gap-6 text-white font-[system-ui] text-xs z-10 drop-shadow-md">
        <div className="flex flex-col items-center">
          <img src={Bin} alt="Recycle Bin" className="w-12 h-12" />
          <p>Recycle Bin</p>
        </div>

        <div className="flex flex-col items-center">
          <img src={Explorer} alt="Explorer" className="w-12 h-12" />
          <p>Explorer</p>
        </div>

        <div className="flex flex-col items-center">
          <img src={paint} alt="Paint" className="w-12 h-12" />
          <p>Paint</p>
        </div>
      </div>

      {/* --- Fake CMD window --- */}
      {terminalOpen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto bg-gray-900 border border-gray-300 shadow-2xl w-[90%] max-w-xl">
            {/* title bar */}
            <div className="flex items-center justify-between bg-gradient-to-r from-[#0b3b82] to-[#1c5fb3] px-2 py-1">
              <span className="text-xs text-white font-[Tahoma]">
                C:\WINDOWS\system32\cmd.exe
              </span>
              <div className="flex gap-1 text-xs">
                <button
                  className="w-5 h-5 bg-gray-200 text-center leading-5 text-black border border-gray-500"
                  onClick={() => setTerminalOpen(false)}
                >
                  X
                </button>
              </div>
            </div>
            {/* body */}
            <div className="bg-black text-green-300 font-mono text-sm p-3 h-64 overflow-y-auto">
              {terminalLines.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}
              {(terminalMode === "user" || terminalMode === "pass" || terminalMode === "done") && (
                <div className="flex">
                  {terminalMode === "done" ? (
                    <span className="mr-1">&gt;</span>
                  ) : null}
                  <input
                    className="flex-1 bg-transparent outline-none text-green-300 caret-green-300"
                    autoFocus
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleTerminalSubmit();
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- XP Taskbar --- */}
      <footer className="mt-auto bg-[#245EDC] border-t-4 border-[#19459B] text-white flex items-center justify-between px-3 z-10 font-[Tahoma]">
        {/* Start Button */}
        <button className="justify-start flex items-center bg-[#1a9f00] hover:bg-[#1dbf00] px-4 h-10 rounded-2xl shadow-inner text-sm font-semibold border border-[#0a6000]">
          <img src={wLogo} alt="Start" className="w-6 mr-1" />
          Start
        </button>

        {/* Task Buttons */}
        <div className="flex gap-2 text-sm justify-start">
          <button
            className="bg-[#3C78D8] hover:bg-[#4A90E2] px-3 py-1 rounded-sm shadow-inner border border-[#1E4BA8] flex flex-row items-center"
            onClick={openTerminal}
          >
            <img src={cmd} className="w-4 mr-2" alt="cmd" />
            C:\Users\...
          </button>
        </div>

        {/* Clock */}
        <div className="bg-[#3C78D8] px-2 py-1 rounded-sm shadow-inner border border-[#1E4BA8] text-sm font-mono flex flex-row h-8 items-center">
          <img className="w-4 mr-2" src={clock} alt="clock" />
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </footer>
    </main>
  );
};

export default Level1;
