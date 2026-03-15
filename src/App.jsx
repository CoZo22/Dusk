// DUSK APP — Supabase Integration
import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LOGO_SRC="data:image/png;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAACZKADAAQAAAABAAABmAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgBmAJkAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAgEBAgMCAgIDBAMDAwMEBgQEBAQEBgcGBgYGBgYHBwcHBwcHBwgICAgICAkJCQkJCwsLCwsLCwsLC//bAEMBAgICAwMDBQMDBQsIBggLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLC//dAAQAJ//aAAwDAQACEQMRAD8A/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Q/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//R/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//S/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//T/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//U/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiivRPhp8Ifiv8ZvEMfhH4Q+GdU8U6rLkpaaTaS3k5A6nZErNgd+OKaTewHndFfS3xH/AGTPi/8ABi2aX4yLpnhe4R/LawvNStX1JG9HsYJJbuPHffCuO9fNsqLHI0aOJADgMucH3GQD+YpuLW6G1YjoooqRBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAF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KKKACiiigAooooAKKKKAP//R/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//S/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//T/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//U/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//V/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//W/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//X/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Q/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Syne:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#06040f;--bg2:#0c0919;--surface:#140f24;--surface2:#1a1530;--surface3:#211c3a;--border:#2d2650;--border2:#3d3565;--violet:#7c3aed;--vlight:#a78bfa;--vdim:#4c1d95;--accent:#c4b5fd;--text:#e2dff0;--text2:#a89ec8;--text3:#6b6090;--danger:#ef4444;--success:#10b981;--gold:#f59e0b;--nav:68px;--top:56px;}
html,body,#root{background:var(--bg);color:var(--text);font-family:'Syne',sans-serif;height:100%;overflow:hidden}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--vdim);border-radius:2px}
.auth-wrap{height:100vh;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 0%,#1a0a3e,var(--bg) 70%);overflow:auto;padding:20px}
.auth-card{background:rgba(20,15,36,.97);border:1px solid var(--border2);border-radius:22px;padding:44px 38px;width:400px;max-width:100%;box-shadow:0 0 80px rgba(124,58,237,.2);animation:fadeUp .5s ease;display:flex;flex-direction:column;align-items:stretch}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.tagline{font-family:'Orbitron',sans-serif;font-size:10px;letter-spacing:3px;color:var(--text3);text-align:center;margin-top:5px}
.stitle{font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:2px;color:var(--text3);text-align:center;text-transform:uppercase;margin:22px 0 16px}
.ig{margin-bottom:13px}.il{font-size:10px;letter-spacing:2px;color:var(--text3);text-transform:uppercase;margin-bottom:5px;display:block}
.inp{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:11px 14px;color:var(--text);font-family:'Syne',sans-serif;font-size:14px;outline:none;transition:border-color .2s}
.inp:focus{border-color:var(--violet);box-shadow:0 0 0 3px rgba(124,58,237,.12)}.inp::placeholder{color:var(--text3)}
textarea.inp{resize:vertical;min-height:80px}select.inp option{background:var(--surface2)}
.btn{border:none;border-radius:10px;padding:10px 20px;cursor:pointer;font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;transition:all .2s;display:inline-flex;align-items:center;justify-content:center;gap:7px}
.btn-full{width:100%}.btn-p{background:linear-gradient(135deg,var(--violet),#5b21b6);color:#fff;box-shadow:0 4px 18px rgba(124,58,237,.4)}
.btn-p:hover{transform:translateY(-1px);box-shadow:0 6px 26px rgba(124,58,237,.5)}.btn-g{background:transparent;color:var(--text2);border:1px solid var(--border)}
.btn-g:hover{border-color:var(--vlight);color:var(--accent)}.btn-d{background:rgba(239,68,68,.1);color:var(--danger);border:1px solid rgba(239,68,68,.3)}
.btn-d:hover{background:rgba(239,68,68,.2)}.btn-sm{padding:6px 12px;font-size:10px}
.lbtn{background:none;border:none;color:var(--vlight);font-family:'Syne',sans-serif;font-size:13px;cursor:pointer;text-decoration:underline;padding:0}
.lbtn:hover{color:var(--accent)}
.shell{display:flex;flex-direction:column;height:100vh;overflow:hidden}
.topbar{height:var(--top);min-height:var(--top);background:rgba(10,7,22,.98);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 18px;flex-shrink:0;position:relative;z-index:50}
.tb-logo{display:flex;align-items:center;gap:9px}
.tb-brand{font-family:'Orbitron',sans-serif;font-size:16px;font-weight:700;color:var(--accent);letter-spacing:5px}
.tb-title{display:none}
.tb-right{display:flex;align-items:center;gap:8px}
.bell-btn{position:relative;background:transparent;border:1px solid var(--border);border-radius:9px;padding:7px 10px;cursor:pointer;color:var(--text2);font-size:15px;transition:all .2s;line-height:1}
.bell-btn:hover{border-color:var(--border2);color:var(--text)}
.bell-count{position:absolute;top:-5px;right:-5px;background:var(--violet);color:#fff;border-radius:50%;width:16px;height:16px;font-size:9px;display:flex;align-items:center;justify-content:center;border:2px solid var(--bg2);font-family:'JetBrains Mono',monospace}
.av-ring{border-radius:50%;border:2px solid var(--border2);transition:border-color .2s;cursor:pointer}
.av-ring:hover,.av-ring.open{border-color:var(--violet)}
.content-area{flex:1;overflow:hidden;display:flex;flex-direction:column}
.mcontent{flex:1;overflow-y:auto;padding:18px 16px}
.mcontent-full{flex:1;overflow:hidden;display:flex;flex-direction:column}
.bottom-nav{height:var(--nav);min-height:var(--nav);background:rgba(8,5,18,.98);backdrop-filter:blur(24px);border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-around;padding:0 4px 6px;flex-shrink:0;z-index:50}
.nb{display:flex;flex-direction:column;align-items:center;gap:3px;padding:5px 10px;border-radius:12px;cursor:pointer;border:none;background:transparent;color:var(--text3);transition:color .2s;min-width:44px;position:relative}
.nb:hover{color:var(--text2)}.nb.on{color:var(--accent)}
.nb-ico{width:40px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:9px;transition:all .2s;font-size:18px}
.nb.on .nb-ico{background:rgba(124,58,237,.2);box-shadow:0 0 14px rgba(124,58,237,.2)}
.nb-lbl{font-size:9px;letter-spacing:1px;text-transform:uppercase;font-family:'Orbitron',sans-serif;font-weight:600;line-height:1}
.nb-dot{position:absolute;top:3px;right:7px;width:7px;height:7px;background:var(--violet);border-radius:50%;border:2px solid var(--bg2)}
.av{border-radius:50%;border:2px solid var(--border2);background:var(--surface3);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Orbitron',sans-serif;font-weight:700;color:var(--accent);overflow:hidden;cursor:pointer}
.av:hover{border-color:var(--vlight)}.av img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.av-sm{width:32px;height:32px;font-size:12px}.av-md{width:44px;height:44px;font-size:16px}.av-xl{width:110px;height:110px;font-size:34px}
.rb{font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:2px 8px;border-radius:20px;font-family:'Orbitron',sans-serif}
.r-a{background:rgba(124,58,237,.2);color:var(--vlight);border:1px solid rgba(124,58,237,.4)}
.r-m{background:rgba(16,185,129,.1);color:#34d399;border:1px solid rgba(16,185,129,.3)}
.r-u{background:rgba(107,96,144,.1);color:var(--text3);border:1px solid var(--border)}
.card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:16px;margin-bottom:12px;transition:border-color .2s}
.card:hover{border-color:var(--border2)}.card-hd{display:flex;align-items:center;gap:10px;margin-bottom:11px}
.comp{background:var(--surface);border:1px solid var(--border2);border-radius:14px;padding:16px;margin-bottom:18px}
.comp-lbl{font-size:10px;letter-spacing:2px;color:var(--text3);text-transform:uppercase;margin-bottom:8px}
.chat-wrap{display:flex;flex-direction:column;flex:1;overflow:hidden}
.chat-msgs{flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:1px}
.cmsg{display:flex;gap:9px;padding:4px 6px;border-radius:9px;transition:background .1s}
.cmsg:hover{background:rgba(20,15,36,.8)}.cmsg.own{flex-direction:row-reverse}
.minfo{display:flex;flex-direction:column}.minfo.own{align-items:flex-end}
.mname{font-size:11px;font-weight:600;color:var(--vlight);margin-bottom:2px}
.mbubble{background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:8px 13px;font-size:14px;line-height:1.5;max-width:min(420px,72vw);word-break:break-word}
.cmsg.own .mbubble{background:rgba(124,58,237,.2);border-color:rgba(124,58,237,.35)}
.mtime{font-size:10px;color:var(--text3);margin-top:3px;font-family:'JetBrains Mono',monospace}
.chat-bar{padding:10px 14px;border-top:1px solid var(--border);background:var(--bg2);display:flex;gap:9px;align-items:flex-end;flex-shrink:0}
.cinput{flex:1;background:var(--surface2);border:1px solid var(--border);border-radius:11px;padding:10px 14px;color:var(--text);font-family:'Syne',sans-serif;font-size:14px;outline:none;resize:none;max-height:100px;min-height:42px;transition:border-color .2s}
.cinput:focus{border-color:var(--violet)}
.sendbtn{background:linear-gradient(135deg,var(--violet),#5b21b6);border:none;border-radius:11px;width:42px;height:42px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;font-size:17px;box-shadow:0 4px 14px rgba(124,58,237,.4)}
.sendbtn:hover{transform:translateY(-1px)}
.dm-wrap{display:flex;flex:1;overflow:hidden}
.dm-list{width:200px;border-right:1px solid var(--border);overflow-y:auto;flex-shrink:0;background:var(--bg2)}
.dm-li{padding:10px 12px;cursor:pointer;transition:background .15s;display:flex;align-items:center;gap:9px;border-bottom:1px solid rgba(45,38,80,.3)}
.dm-li:hover{background:var(--surface)}.dm-li.on{background:rgba(124,58,237,.1);border-left:2px solid var(--violet)}
.dm-chat{flex:1;display:flex;flex-direction:column;overflow:hidden}
.ev-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:16px;margin-bottom:12px;position:relative;overflow:hidden;transition:all .2s}
.ev-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--violet),transparent)}
.ev-card:hover{border-color:var(--border2)}
.ev-title{font-family:'Orbitron',sans-serif;font-size:13px;letter-spacing:1px;color:var(--accent);margin-bottom:7px}
.ev-meta{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:11px}.ev-mi{font-size:12px;color:var(--text2)}
.ci-btn{background:linear-gradient(135deg,#059669,#047857);color:#fff;border:none;border-radius:9px;padding:7px 14px;cursor:pointer;font-family:'Orbitron',sans-serif;font-size:10px;letter-spacing:1px;transition:all .2s;box-shadow:0 4px 12px rgba(5,150,105,.3)}
.ci-btn:hover{transform:translateY(-1px)}.ci-done{background:linear-gradient(135deg,#374151,#1f2937);cursor:default;box-shadow:none}
.ev-grid{display:grid;grid-template-columns:1fr 260px;gap:16px;align-items:start}
@media(max-width:680px){.ev-grid{grid-template-columns:1fr}}
.lb-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden}
.lb-head{padding:12px 16px;border-bottom:1px solid var(--border);background:rgba(124,58,237,.06);font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:2px;color:var(--accent)}
.lb-row{display:flex;align-items:center;gap:9px;padding:10px 16px;border-bottom:1px solid rgba(45,38,80,.3);transition:background .15s;cursor:pointer}
.lb-row:hover{background:var(--surface2)}
.lb-rank{font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;width:24px;text-align:center}
.r1{color:var(--gold)}.r2{color:#9ca3af}.r3{color:#b45309}
.pts{margin-left:auto;background:rgba(124,58,237,.12);color:var(--vlight);border:1px solid rgba(124,58,237,.25);border-radius:20px;padding:2px 10px;font-size:11px;font-family:'JetBrains Mono',monospace}
.atable{width:100%;border-collapse:collapse}
.atable th{text-align:left;padding:9px 12px;font-size:10px;letter-spacing:2px;color:var(--text3);text-transform:uppercase;border-bottom:1px solid var(--border);font-weight:500}
.atable td{padding:10px 12px;border-bottom:1px solid rgba(45,38,80,.3);font-size:13px;vertical-align:middle}
.atable tr:hover td{background:var(--surface2)}
.p-cover{height:130px;border-radius:14px 14px 0 0;background:linear-gradient(135deg,#1a0a3e,#0c0919,#1a0a3e);position:relative;overflow:hidden}
.p-cover::after{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(167,139,250,0.1)'/%3E%3C/svg%3E")}
.dropdown{position:fixed;top:calc(var(--top) + 8px);right:16px;background:var(--surface);border:1px solid var(--border2);border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.8);z-index:400;overflow:hidden;animation:fdDown .18s ease}
@keyframes fdDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.dd-n{width:290px;max-height:360px;overflow-y:auto}.dd-p{width:210px}
.nhead{padding:11px 14px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:var(--surface);z-index:1}
.ntitle{font-family:'Orbitron',sans-serif;font-size:10px;letter-spacing:2px;color:var(--accent)}
.nitem{padding:10px 14px;border-bottom:1px solid rgba(45,38,80,.3);font-size:12px;line-height:1.4}
.nitem.unread{background:rgba(124,58,237,.05)}.ndot{width:6px;height:6px;background:var(--violet);border-radius:50%;display:inline-block;margin-right:6px;vertical-align:middle}
.pmenu-head{padding:13px 15px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px}
.pmenu-item{display:flex;align-items:center;gap:9px;padding:11px 15px;cursor:pointer;font-size:13px;color:var(--text2);transition:background .15s;border:none;background:none;width:100%;text-align:left}
.pmenu-item:hover{background:var(--surface2);color:var(--text)}.pmenu-item.red{color:var(--danger)}.pmenu-item.red:hover{background:rgba(239,68,68,.08)}
.sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.st{font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:2px;color:var(--text2);text-transform:uppercase}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media(max-width:520px){.g2{grid-template-columns:1fr}}
.empty{text-align:center;padding:48px 20px;color:var(--text3)}.empty-ico{font-size:34px;margin-bottom:10px;opacity:.4}
.icode{background:var(--surface2);border:1px solid var(--border);border-radius:9px;padding:9px 13px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--accent);letter-spacing:2px;text-align:center;margin:8px 0}
.tab-bar{display:flex;gap:7px;margin-bottom:18px;flex-wrap:wrap}
.overlay{position:fixed;inset:0;z-index:390}
.toasts{position:fixed;bottom:calc(var(--nav) + 12px);right:14px;display:flex;flex-direction:column;gap:8px;z-index:500}
.toast{background:var(--surface);border:1px solid var(--border2);border-radius:10px;padding:11px 15px;font-size:13px;box-shadow:0 10px 40px rgba(0,0,0,.4);display:flex;align-items:center;gap:8px;min-width:220px;animation:slideIn .3s ease}
@keyframes slideIn{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}
.toast.success{border-color:rgba(16,185,129,.4)}.toast.error{border-color:rgba(239,68,68,.4)}.toast.info{border-color:rgba(124,58,237,.4)}

.loader{display:flex;align-items:center;justify-content:center;height:100vh;background:var(--bg)}
.spin{width:36px;height:36px;border:2px solid var(--border2);border-top-color:var(--violet);border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
`;


// ─── HELPERS ─────────────────────────────────────────────────
const uid=()=>Math.random().toString(36).slice(2,10);
const ago=(iso)=>{const d=(Date.now()-new Date(iso))/1000;if(d<60)return"just now";if(d<3600)return Math.floor(d/60)+"m";if(d<86400)return Math.floor(d/3600)+"h";return Math.floor(d/86400)+"d";};
const fmt=(iso)=>new Date(iso).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
const gc=()=>"DUSK-"+Math.random().toString(36).slice(2,6).toUpperCase()+"-"+Math.random().toString(36).slice(2,6).toUpperCase();
const hav=(a,b,c,d)=>{const R=6371000,r=x=>x*Math.PI/180,dl=r(c-a),dln=r(d-b),aa=Math.sin(dl/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dln/2)**2;return R*2*Math.atan2(Math.sqrt(aa),Math.sqrt(1-aa));};

const addNotif=async(userId,message)=>{await sb.from("notifications").insert({user_id:userId,message});};
const notifyAll=async(profiles,message,excludeId)=>{
  const targets=profiles.filter(p=>p.id!==excludeId&&p.approved);
  if(!targets.length)return;
  await sb.from("notifications").insert(targets.map(p=>({user_id:p.id,message})));
};

// ─── COMPONENTS ──────────────────────────────────────────────
const Logo=({s=300})=>LOGO_SRC
  ?<img src={LOGO_SRC} alt="Dusk" style={{width:s,height:s,objectFit:"contain",display:"block",mixBlendMode:"screen"}}/>
  :null;

const Av=({user,size="sm",onClick})=>(
  <div className={`av av-${size}`} onClick={onClick}>
    {user?.avatar_url?<img src={user.avatar_url} alt=""/>:(user?.name||"?")[0].toUpperCase()}
  </div>
);
const Rb=({role})=><span className={`rb ${role==="admin"?"r-a":role==="moderator"?"r-m":"r-u"}`}>{role}</span>;
const Toasts=({t})=><div className="toasts">{t.map(x=><div key={x.id} className={`toast ${x.type}`}><span>{x.type==="success"?"✓":x.type==="error"?"✗":"◆"}</span>{x.msg}</div>)}</div>;
function AuthField({label,type,value,onChange,placeholder,onEnter}){
  return(<div className="ig"><label className="il">{label}</label><input className="inp" type={type||"text"} value={value} onChange={onChange} placeholder={placeholder} autoComplete="off" onKeyDown={e=>onEnter&&e.key==="Enter"&&onEnter()}/></div>);
}

// ─── ANNOUNCEMENTS ───────────────────────────────────────────
function Ann({cu,profiles,toast}){
  const [posts,setPosts]=useState([]);
  const [txt,setTxt]=useState("");
  const mod=cu.role==="admin"||cu.role==="moderator";
  const adm=cu.role==="admin";

  useEffect(()=>{
    const load=()=>sb.from("posts").select("*,author:profiles(id,name,role,avatar_url)").order("created_at",{ascending:false}).then(({data})=>setPosts(data||[]));
    load();
    const ch=sb.channel("posts-ch").on("postgres_changes",{event:"*",schema:"public",table:"posts"},load).subscribe();
    return ()=>sb.removeChannel(ch);
  },[]);

  const post=async()=>{
    if(!txt.trim())return;
    const {error}=await sb.from("posts").insert({author_id:cu.id,content:txt.trim()});
    if(error)return toast(error.message,"error");
    await notifyAll(profiles,`📢 ${cu.name}: ${txt.slice(0,50)}`,cu.id);
    setTxt("");toast("Posted","success");
  };
  const del=async(id)=>sb.from("posts").delete().eq("id",id);
  const like=async(p)=>{
    const liked=p.likes?.includes(cu.id);
    await sb.from("posts").update({likes:liked?p.likes.filter(l=>l!==cu.id):[...(p.likes||[]),cu.id]}).eq("id",p.id);
  };

  return(<div>
    <div className="sh"><div className="st">Announcements</div></div>
    {mod&&<div className="comp"><div className="comp-lbl">New Announcement</div><textarea className="inp" value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Share something with the chosen ones..."/><div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}><button className="btn btn-p btn-sm" onClick={post}>Post</button></div></div>}
    {posts.length===0&&<div className="empty"><div className="empty-ico">🌑</div><div>Silence. For now.</div></div>}
    {posts.map(p=>{
      const liked=p.likes?.includes(cu.id);
      return(<div key={p.id} className="card">
        <div className="card-hd">
          <Av user={p.author} size="md"/>
          <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:14,fontWeight:600}}>{p.author?.name||"?"}</span><Rb role={p.author?.role}/></div><div style={{fontSize:11,color:"var(--text3)"}}>{ago(p.created_at)} ago</div></div>
          {(adm||p.author_id===cu.id)&&<button className="btn btn-d btn-sm" onClick={()=>del(p.id)}>Delete</button>}
        </div>
        <div style={{fontSize:14,lineHeight:1.65,marginBottom:11}}>{p.content}</div>
        <button className="btn btn-g btn-sm" style={liked?{color:"var(--vlight)",borderColor:"var(--violet)"}:{}} onClick={()=>like(p)}>{liked?"◆":"◇"} {p.likes?.length||0}</button>
      </div>);
    })}
  </div>);
}

// ─── LIVE CHAT ────────────────────────────────────────────────
function Chat({cu}){
  const [msgs,setMsgs]=useState([]);
  const [msg,setMsg]=useState("");
  const ref=useRef(null);

  useEffect(()=>{
    sb.from("chat_messages").select("*,user:profiles(id,name,role,avatar_url)").order("created_at",{ascending:true}).limit(100).then(({data})=>setMsgs(data||[]));
    const ch=sb.channel("chat-ch").on("postgres_changes",{event:"INSERT",schema:"public",table:"chat_messages"},payload=>{
      sb.from("profiles").select("id,name,role,avatar_url").eq("id",payload.new.user_id).single().then(({data:user})=>{
        setMsgs(prev=>[...prev,{...payload.new,user}]);
      });
    }).subscribe();
    return ()=>sb.removeChannel(ch);
  },[]);

  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"});},[msgs.length]);

  const send=async()=>{
    if(!msg.trim())return;
    await sb.from("chat_messages").insert({user_id:cu.id,content:msg.trim()});
    setMsg("");
  };

  return(<div className="chat-wrap">
    <div className="chat-msgs">
      {msgs.length===0&&<div className="empty"><div className="empty-ico">💬</div><div>No messages yet.</div></div>}
      {msgs.map(m=>{
        const own=m.user_id===cu.id;
        return(<div key={m.id} className={`cmsg ${own?"own":""}`}>
          <Av user={m.user} size="sm"/>
          <div className={`minfo ${own?"own":""}`}>
            <div className="mname" style={{color:own?"var(--text3)":"var(--vlight)"}}>{own?"You":m.user?.name||"?"}</div>
            <div className="mbubble">{m.content}</div>
            <div className="mtime">{fmt(m.created_at)}</div>
          </div>
        </div>);
      })}
      <div ref={ref}/>
    </div>
    <div className="chat-bar">
      <textarea className="cinput" value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Say something to the chosen..." rows={1} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}/>
      <button className="sendbtn" onClick={send}>➤</button>
    </div>
  </div>);
}

// ─── EVENTS ──────────────────────────────────────────────────
function Events({cu,profiles,toast}){
  const [events,setEvents]=useState([]);
  const [showF,setShowF]=useState(false);
  const [f,setF]=useState({title:"",desc:"",loc:"",lat:"",lng:"",date:"",radius:"100"});
  const ff=(k,v)=>setF(p=>({...p,[k]:v}));
  const adm=cu.role==="admin";

  useEffect(()=>{
    const load=()=>sb.from("events").select("*").order("created_at",{ascending:false}).then(({data})=>setEvents(data||[]));
    load();
    const ch=sb.channel("events-ch").on("postgres_changes",{event:"*",schema:"public",table:"events"},load).subscribe();
    return ()=>sb.removeChannel(ch);
  },[]);

  const create=async()=>{
    if(!adm)return toast("Only admins can create events","error");
    if(!f.title.trim()||!f.loc.trim())return toast("Title and location required","error");
    const {error}=await sb.from("events").insert({title:f.title,description:f.desc,location:f.loc,lat:parseFloat(f.lat)||0,lng:parseFloat(f.lng)||0,radius:parseInt(f.radius)||100,event_date:f.date||null,created_by:cu.id});
    if(error)return toast(error.message,"error");
    await notifyAll(profiles,`🌒 New event: ${f.title}`,cu.id);
    toast("Created!","success");setShowF(false);setF({title:"",desc:"",loc:"",lat:"",lng:"",date:"",radius:"100"});
  };

  const del=async(id)=>{await sb.from("events").delete().eq("id",id);toast("Deleted","info");};

  const checkIn=async(ev)=>{
    if(ev.check_ins?.includes(cu.id))return toast("Already checked in!","info");
    if(!navigator.geolocation)return toast("GPS not available","error");
    toast("Getting location...","info");
    navigator.geolocation.getCurrentPosition(async pos=>{
      const d=hav(pos.coords.latitude,pos.coords.longitude,ev.lat,ev.lng);
      if(d>ev.radius){toast(Math.round(d)+"m away, need "+ev.radius+"m","error");return;}
      await sb.from("events").update({check_ins:[...(ev.check_ins||[]),cu.id]}).eq("id",ev.id);
      await sb.from("profiles").update({points:(cu.points||0)+1}).eq("id",cu.id);
      await addNotif(cu.id,`+1 point at ${ev.title}! 🏆`);
      toast("+1 point earned!","success");
    },()=>toast("GPS denied","error"));
  };

  const sorted=[...profiles].filter(p=>p.approved).sort((a,b)=>(b.points||0)-(a.points||0));

  return(<div>
    <div className="sh"><div className="st">Events</div>{adm&&<button className="btn btn-p btn-sm" onClick={()=>setShowF(!showF)}>{showF?"✕ Cancel":"+ Create"}</button>}</div>
    {showF&&adm&&<div className="comp">
      <div className="comp-lbl">New Event</div>
      <div className="g2"><div className="ig"><label className="il">Title</label><input className="inp" value={f.title} onChange={e=>ff("title",e.target.value)} placeholder="Event name"/></div><div className="ig"><label className="il">Date & Time</label><input className="inp" type="datetime-local" value={f.date} onChange={e=>ff("date",e.target.value)}/></div></div>
      <div className="ig"><label className="il">Location</label><input className="inp" value={f.loc} onChange={e=>ff("loc",e.target.value)} placeholder="Club Void"/></div>
      <div className="g2"><div className="ig"><label className="il">Latitude</label><input className="inp" value={f.lat} onChange={e=>ff("lat",e.target.value)} placeholder="47.79"/></div><div className="ig"><label className="il">Longitude</label><input className="inp" value={f.lng} onChange={e=>ff("lng",e.target.value)} placeholder="22.88"/></div></div>
      <div className="g2"><div className="ig"><label className="il">Radius (m)</label><input className="inp" value={f.radius} onChange={e=>ff("radius",e.target.value)}/></div><div className="ig"><label className="il">Description</label><input className="inp" value={f.desc} onChange={e=>ff("desc",e.target.value)} placeholder="Details..."/></div></div>
      <button className="btn btn-p btn-sm" onClick={create}>Create Event</button>
    </div>}
    <div className="ev-grid">
      <div>
        {events.length===0&&<div className="empty"><div className="empty-ico">🌒</div><div>No events yet.</div></div>}
        {events.map(ev=>{
          const ci=ev.check_ins?.includes(cu.id);
          return(<div key={ev.id} className="ev-card">
            <div className="ev-title">{ev.title}</div>
            {ev.description&&<p style={{fontSize:13,color:"var(--text2)",marginBottom:8}}>{ev.description}</p>}
            <div className="ev-meta"><span className="ev-mi">📍 {ev.location}</span>{ev.event_date&&<span className="ev-mi">🕐 {new Date(ev.event_date).toLocaleString()}</span>}<span className="ev-mi">👥 {ev.check_ins?.length||0}</span><span className="ev-mi">📡 {ev.radius}m</span></div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
              <button className={`ci-btn${ci?" ci-done":""}`} onClick={()=>!ci&&checkIn(ev)}>{ci?"✓ Checked In (+1pt)":"📡 GPS Check-In"}</button>
              {adm&&<button className="btn btn-d btn-sm" onClick={()=>del(ev.id)}>Delete</button>}
            </div>
          </div>);
        })}
      </div>
      <div className="lb-card">
        <div className="lb-head">🏆 Leaderboard</div>
        {sorted.slice(0,10).map((u,i)=>(
          <div key={u.id} className="lb-row">
            <div className={`lb-rank${i===0?" r1":i===1?" r2":i===2?" r3":""}`}>{i+1}</div>
            <Av user={u} size="sm"/>
            <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.name}</div><div style={{fontSize:9,color:"var(--text3)",textTransform:"uppercase"}}>{u.role}</div></div>
            <div className="pts">{u.points||0}pt</div>
          </div>
        ))}
      </div>
    </div>
  </div>);
}

// ─── DIRECT MESSAGES ─────────────────────────────────────────
function DM({cu,profiles,toast,initUser}){
  const [active,setActive]=useState(initUser||null);
  const [msgs,setMsgs]=useState([]);
  const [msg,setMsg]=useState("");
  const ref=useRef(null);
  const members=profiles.filter(p=>p.id!==cu.id&&p.approved);

  useEffect(()=>{
    if(!active)return;
    sb.from("direct_messages").select("*")
      .or(`and(sender_id.eq.${cu.id},receiver_id.eq.${active.id}),and(sender_id.eq.${active.id},receiver_id.eq.${cu.id})`)
      .order("created_at",{ascending:true})
      .then(({data})=>setMsgs(data||[]));
    const ch=sb.channel(`dm-${[cu.id,active.id].sort().join("-")}`)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"direct_messages"},payload=>{
        const m=payload.new;
        if((m.sender_id===cu.id&&m.receiver_id===active.id)||(m.sender_id===active.id&&m.receiver_id===cu.id))
          setMsgs(prev=>[...prev,m]);
      }).subscribe();
    return ()=>sb.removeChannel(ch);
  },[active?.id]);

  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"});},[msgs.length]);

  const send=async()=>{
    if(!msg.trim()||!active)return;
    await sb.from("direct_messages").insert({sender_id:cu.id,receiver_id:active.id,content:msg.trim()});
    await addNotif(active.id,`✉️ DM from ${cu.name}: ${msg.slice(0,40)}`);
    setMsg("");
  };

  return(<div className="dm-wrap">
    <div className="dm-list">
      <div style={{padding:"9px 12px",fontSize:9,letterSpacing:3,color:"var(--text3)",textTransform:"uppercase",borderBottom:"1px solid var(--border)"}}>Members</div>
      {members.length===0&&<div style={{padding:14,fontSize:13,color:"var(--text3)"}}>No members yet</div>}
      {members.map(u=>(
        <div key={u.id} className={`dm-li${active?.id===u.id?" on":""}`} onClick={()=>setActive(u)}>
          <Av user={u} size="sm"/>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600}}>{u.name}</div></div>
        </div>
      ))}
    </div>
    <div className="dm-chat">
      {!active
        ?<div className="empty" style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}><div className="empty-ico">✉️</div><div>Select a member</div></div>
        :<>
          <div style={{padding:"9px 14px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:10,background:"var(--bg2)",flexShrink:0}}>
            <Av user={active} size="sm"/>
            <div><div style={{fontSize:13,fontWeight:600}}>{active.name}</div><div style={{fontSize:10,color:"var(--text3)",textTransform:"uppercase",letterSpacing:1}}>{active.role}</div></div>
          </div>
          <div className="chat-msgs">
            {msgs.length===0&&<div className="empty"><div className="empty-ico">💬</div><div>Start a conversation</div></div>}
            {msgs.map(m=>{
              const own=m.sender_id===cu.id;
              const u=own?cu:active;
              return(<div key={m.id} className={`cmsg${own?" own":""}`}>
                <Av user={u} size="sm"/>
                <div className={`minfo${own?" own":""}`}><div className="mbubble">{m.content}</div><div className="mtime">{fmt(m.created_at)}</div></div>
              </div>);
            })}
            <div ref={ref}/>
          </div>
          <div className="chat-bar">
            <textarea className="cinput" value={msg} onChange={e=>setMsg(e.target.value)} placeholder={`Message ${active.name}...`} rows={1} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}/>
            <button className="sendbtn" onClick={send}>➤</button>
          </div>
        </>
      }
    </div>
  </div>);
}

// ─── PROFILE ─────────────────────────────────────────────────
function Prof({cu,profiles,toast,userId,onMsg,onRefresh}){
  const u=profiles.find(p=>p.id===userId)||cu;
  const [editing,setEditing]=useState(false);
  const [bio,setBio]=useState(u?.bio||"");
  const [evs,setEvs]=useState([]);
  const isOwn=userId===cu.id;

  useEffect(()=>{
    sb.from("events").select("id,title,check_ins").then(({data})=>setEvs((data||[]).filter(e=>e.check_ins?.includes(userId))));
  },[userId]);

  const upload=(e)=>{
    const file=e.target.files[0];if(!file)return;
    const r=new FileReader();
    r.onload=async ev=>{
      await sb.from("profiles").update({avatar_url:ev.target.result}).eq("id",cu.id);
      onRefresh();toast("Photo updated","success");
    };
    r.readAsDataURL(file);
  };

  const saveBio=async()=>{
    await sb.from("profiles").update({bio}).eq("id",cu.id);
    onRefresh();setEditing(false);toast("Saved","success");
  };

  if(!u)return <div className="empty"><div>User not found</div></div>;

  return(<div>
    <div style={{background:"var(--surface)",borderRadius:14,border:"1px solid var(--border)",overflow:"hidden",marginBottom:16}}>
      <div className="p-cover"/>
      <div style={{padding:"0 18px 18px",marginTop:-50,position:"relative"}}>
        <div style={{display:"flex",alignItems:"flex-end",gap:12,marginBottom:12}}>
          <div className="av av-xl" style={{border:"3px solid var(--surface)",boxShadow:"0 0 18px rgba(124,58,237,.3)"}}>
            {u.avatar_url?<img src={u.avatar_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}/>:u.name?.[0]?.toUpperCase()}
          </div>
          {isOwn
            ?<label style={{cursor:"pointer",marginBottom:5}}><span className="btn btn-g btn-sm">Change Photo</span><input type="file" accept="image/*" onChange={upload} style={{display:"none"}}/></label>
            :<button className="btn btn-p btn-sm" style={{marginBottom:5}} onClick={()=>onMsg(u)}>✉️ Message</button>
          }
        </div>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:5}}>
          <h2 style={{fontFamily:"'Orbitron',sans-serif",fontSize:17,color:"var(--accent)"}}>{u.name}</h2><Rb role={u.role}/>
        </div>
        {editing
          ?<div><textarea className="inp" value={bio} onChange={e=>setBio(e.target.value)} rows={3} style={{marginBottom:8}}/><div style={{display:"flex",gap:8}}><button className="btn btn-p btn-sm" onClick={saveBio}>Save</button><button className="btn btn-g btn-sm" onClick={()=>setEditing(false)}>Cancel</button></div></div>
          :<div><p style={{fontSize:14,color:"var(--text2)",marginBottom:isOwn?7:0}}>{u.bio||(isOwn?"No bio yet.":"No bio.")}</p>{isOwn&&<button className="lbtn" onClick={()=>{setBio(u.bio||"");setEditing(true);}}>Edit bio</button>}</div>
        }
      </div>
    </div>
    <div className="g2">
      <div style={{background:"var(--surface)",borderRadius:13,border:"1px solid var(--border)",padding:15}}>
        <div style={{fontSize:10,letterSpacing:2,color:"var(--text3)",textTransform:"uppercase",marginBottom:10}}>Stats</div>
        {[["Points",<span className="pts">{u.points||0}pt</span>],["Events",evs.length],["Joined",new Date(u.created_at).toLocaleDateString()]].map(([l,v])=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid rgba(45,38,80,.3)",fontSize:13}}>
            <span style={{color:"var(--text2)"}}>{l}</span><span>{v}</span>
          </div>
        ))}
      </div>
      <div style={{background:"var(--surface)",borderRadius:13,border:"1px solid var(--border)",padding:15}}>
        <div style={{fontSize:10,letterSpacing:2,color:"var(--text3)",textTransform:"uppercase",marginBottom:10}}>Events Attended</div>
        {evs.length===0?<div style={{fontSize:13,color:"var(--text3)"}}>None yet</div>:evs.map(e=><div key={e.id} style={{fontSize:13,padding:"6px 0",borderBottom:"1px solid rgba(45,38,80,.3)",color:"var(--text2)"}}>✓ {e.title}</div>)}
      </div>
    </div>
  </div>);
}

// ─── ADMIN ───────────────────────────────────────────────────
function Adm({cu,profiles,toast,onRefresh}){
  const [tab,setTab]=useState("members");
  const [ne,setNe]=useState({});
  const [lc,setLc]=useState("");
  const [codes,setCodes]=useState([]);
  const [reqs,setReqs]=useState([]);

  useEffect(()=>{
    sb.from("invite_codes").select("*").order("created_at",{ascending:false}).then(({data})=>setCodes(data||[]));
    sb.from("invite_requests").select("*").order("created_at",{ascending:false}).then(({data})=>setReqs(data||[]));
  },[tab]);

  const approve=async(id)=>{await sb.from("profiles").update({approved:true}).eq("id",id);await addNotif(id,"✓ Account approved! Welcome to Dusk.");onRefresh();toast("Approved","success");};
  const setRole=async(id,role)=>{await sb.from("profiles").update({role}).eq("id",id);onRefresh();toast("Role updated","success");};
  const remove=async(id)=>{await sb.from("profiles").delete().eq("id",id);onRefresh();toast("Removed","info");};
  const setName=async(id)=>{
    if(!ne[id]?.trim())return;
    await sb.from("profiles").update({name:ne[id].trim()}).eq("id",id);
    await addNotif(id,`Your name: ${ne[id].trim()}`);
    setNe(n=>({...n,[id]:""}));
    onRefresh();toast("Name set","success");
  };
  const genInv=async()=>{
    const c=gc();
    await sb.from("invite_codes").insert({code:c,created_by:cu.id});
    setLc(c);
    sb.from("invite_codes").select("*").order("created_at",{ascending:false}).then(({data})=>setCodes(data||[]));
    toast("Generated!","success");
  };
  const sendToReq=async(req)=>{
    const c=gc();
    await sb.from("invite_codes").insert({code:c,created_by:cu.id});
    await sb.from("invite_requests").update({status:"sent",code:c}).eq("id",req.id);
    setReqs(r=>r.map(x=>x.id===req.id?{...x,status:"sent",code:c}:x));
    toast(`Code: ${c}`,"success");
  };
  const dismissReq=async(id)=>{await sb.from("invite_requests").update({status:"dismissed"}).eq("id",id);setReqs(r=>r.filter(x=>x.id!==id));};

  const pending=profiles.filter(p=>!p.approved);
  const pendingReqs=reqs.filter(r=>r.status==="pending");
  const tabs=[{id:"members",l:"Members"},{id:"pending",l:"Pending",c:pending.length},{id:"codes",l:"Codes"},{id:"requests",l:"Inv. Requests",c:pendingReqs.length}];

  return(<div>
    <div className="tab-bar">
      {tabs.map(t=><button key={t.id} className="btn btn-g btn-sm" style={tab===t.id?{background:"rgba(124,58,237,.15)",borderColor:"var(--violet)",color:"var(--accent)"}:{}} onClick={()=>setTab(t.id)}>
        {t.l}{t.c>0&&<span style={{marginLeft:4,background:"var(--violet)",color:"#fff",borderRadius:10,padding:"1px 6px",fontSize:9}}>{t.c}</span>}
      </button>)}
    </div>

    {tab==="members"&&(
      <div style={{background:"var(--surface)",borderRadius:13,border:"1px solid var(--border)",overflow:"auto"}}>
        <table className="atable">
          <thead><tr><th>Member</th><th>Role</th><th>Pts</th><th>Set Name</th><th></th></tr></thead>
          <tbody>{profiles.filter(p=>p.approved).map(u=>(
            <tr key={u.id}>
              <td><div style={{display:"flex",alignItems:"center",gap:8}}><Av user={u} size="sm"/>{u.name}</div></td>
              <td>{u.id!==cu.id?<select className="inp" style={{padding:"4px 8px",width:"auto"}} value={u.role} onChange={e=>setRole(u.id,e.target.value)}><option value="member">Member</option><option value="moderator">Moderator</option><option value="admin">Admin</option></select>:<Rb role="admin"/>}</td>
              <td><span className="pts">{u.points||0}pt</span></td>
              <td><div style={{display:"flex",gap:5}}><input className="inp" style={{padding:"4px 8px",width:100,fontSize:12}} value={ne[u.id]||""} onChange={e=>setNe(n=>({...n,[u.id]:e.target.value}))} placeholder="New name"/><button className="btn btn-g btn-sm" onClick={()=>setName(u.id)}>Set</button></div></td>
              <td>{u.id!==cu.id&&<button className="btn btn-d btn-sm" onClick={()=>remove(u.id)}>✕</button>}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    )}

    {tab==="pending"&&(
      <div>
        {pending.length===0&&<div className="empty"><div className="empty-ico">✓</div><div>No pending</div></div>}
        {pending.map(u=>(
          <div key={u.id} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:14,marginBottom:10,display:"flex",alignItems:"center",gap:11}}>
            <Av user={u} size="md"/>
            <div style={{flex:1}}><div style={{fontWeight:600}}>{u.name}</div><div style={{fontSize:12,color:"var(--text3)"}}>Code: {u.invite_code}</div></div>
            <button className="btn btn-p btn-sm" onClick={()=>approve(u.id)}>Approve</button>
            <button className="btn btn-d btn-sm" onClick={()=>remove(u.id)}>Reject</button>
          </div>
        ))}
      </div>
    )}

    {tab==="codes"&&(
      <div>
        <div style={{marginBottom:12}}><button className="btn btn-p btn-sm" onClick={genInv}>Generate Code</button></div>
        {lc&&<div className="icode">New: {lc}</div>}
        <div style={{background:"var(--surface)",borderRadius:13,border:"1px solid var(--border)",overflow:"auto"}}>
          <table className="atable"><thead><tr><th>Code</th><th>Status</th></tr></thead>
            <tbody>{codes.map(c=>(<tr key={c.id}><td><span style={{fontFamily:"'JetBrains Mono'",fontSize:13,color:"var(--accent)"}}>{c.code}</span></td><td><span className={`rb ${c.used?"r-u":"r-a"}`}>{c.used?"Used":"Available"}</span></td></tr>))}</tbody>
          </table>
        </div>
      </div>
    )}

    {tab==="requests"&&(
      <div>
        {reqs.length===0&&<div className="empty"><div className="empty-ico">📩</div><div>No requests</div></div>}
        {reqs.map(r=>(
          <div key={r.id} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:14,marginBottom:10}}>
            <div style={{fontWeight:600,marginBottom:3}}>{r.email}</div>
            {r.message&&<div style={{fontSize:13,color:"var(--text2)",marginBottom:7}}>{r.message}</div>}
            {r.code&&<div className="icode">Code: {r.code}</div>}
            {r.status==="pending"&&<div style={{display:"flex",gap:7,marginTop:8}}><button className="btn btn-p btn-sm" onClick={()=>sendToReq(r)}>Send Code</button><button className="btn btn-g btn-sm" onClick={()=>dismissReq(r.id)}>Dismiss</button></div>}
            {r.status==="sent"&&<span className="rb r-m">Sent</span>}
          </div>
        ))}
      </div>
    )}
  </div>);
}

// ─── MAIN APP ────────────────────────────────────────────────
export default function App(){
  const [session,setSession]=useState(null);
  const [cu,setCu]=useState(null);
  const [profiles,setProfiles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState("ann");
  const [profId,setProfId]=useState(null);
  const [dmInit,setDmInit]=useState(null);
  const [toasts,setToasts]=useState([]);
  const [showN,setShowN]=useState(false);
  const [showP,setShowP]=useState(false);
  const [notifs,setNotifs]=useState([]);
  const [am,setAm]=useState("login");
  const [af,setAf]=useState({email:"",pw:"",code:"",name:"",confirm:""});
  const afc=(k,v)=>setAf(p=>({...p,[k]:v}));

  const toast=(msg,type="info")=>{const id=uid();setToasts(t=>[...t,{id,msg,type}]);setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3200);};

  const loadProfile=useCallback(async(id)=>{
    const {data}=await sb.from("profiles").select("*").eq("id",id).single();
    setCu(data);setLoading(false);
    const {data:all}=await sb.from("profiles").select("*").order("points",{ascending:false});
    setProfiles(all||[]);
  },[]);

  const refreshAll=useCallback(async()=>{
    if(!session)return;
    const {data:all}=await sb.from("profiles").select("*").order("points",{ascending:false});
    setProfiles(all||[]);
    const {data:me}=await sb.from("profiles").select("*").eq("id",session.user.id).single();
    if(me)setCu(me);
  },[session]);

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{
      setSession(session);
      if(session)loadProfile(session.user.id);
      else setLoading(false);
    });
    const {data:{subscription}}=sb.auth.onAuthStateChange((_e,session)=>{
      setSession(session);
      if(session)loadProfile(session.user.id);
      else{setCu(null);setLoading(false);}
    });
    return ()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!cu)return;
    sb.from("notifications").select("*").eq("user_id",cu.id).order("created_at",{ascending:false}).limit(20).then(({data})=>setNotifs(data||[]));
    const ch=sb.channel("notifs-"+cu.id)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"notifications",filter:`user_id=eq.${cu.id}`},payload=>setNotifs(prev=>[payload.new,...prev]))
      .on("postgres_changes",{event:"*",schema:"public",table:"profiles"},()=>refreshAll())
      .subscribe();
    return ()=>sb.removeChannel(ch);
  },[cu?.id]);

  const login=async()=>{const {error}=await sb.auth.signInWithPassword({email:af.email,password:af.pw});if(error)toast(error.message,"error");};
  const register=async()=>{
    const {data:ic}=await sb.from("invite_codes").select("*").eq("code",af.code).single();
    if(!ic)return toast("Invalid invite code","error");
    if(ic.used)return toast("This invite code has already been used","error");
    if(!af.email||!af.pw)return toast("Fill all fields","error");
    if(af.pw!==af.confirm)return toast("Passwords don't match","error");
    const {data,error}=await sb.auth.signUp({email:af.email,password:af.pw,options:{data:{name:af.name||af.email.split("@")[0],invite_code:af.code}}});
    if(error)return toast(error.message,"error");
    await sb.from("invite_codes").update({used:true,used_by:data.user.id}).eq("code",af.code);
    const {data:admins}=await sb.from("profiles").select("id").eq("role","admin");
    if(admins)await Promise.all(admins.map(a=>addNotif(a.id,"🔔 Approval needed: "+af.email)));
    toast("Registered! Confirm email, then await admin approval.","success");
    setAm("login");
  };
  const reqInv=async()=>{if(!af.email)return toast("Email required","error");await sb.from("invite_requests").insert({email:af.email,message:af.name});toast("Request submitted!","success");setAm("login");};
  const resetPw=async()=>{const {error}=await sb.auth.resetPasswordForEmail(af.email,{redirectTo:window.location.origin});if(error)toast(error.message,"error");else{toast("Reset email sent!","success");setAm("login");}};
  const logout=async()=>{await sb.auth.signOut();setCu(null);setPage("ann");toast("See you in the shadows.","info");};
  const closeAll=()=>{setShowN(false);setShowP(false);};
  const markRead=async()=>{await sb.from("notifications").update({read:true}).eq("user_id",cu.id).eq("read",false);setNotifs(prev=>prev.map(n=>({...n,read:true})));};
  const clearNotifs=async()=>{await sb.from("notifications").delete().eq("user_id",cu.id);setNotifs([]);setShowN(false);};
  const unread=notifs.filter(n=>!n.read).length;

  if(loading)return<><style>{S}</style><div className="loader"><div className="spin"/></div></>;

  if(!session||!cu)return(<><style>{S}</style>
    <div className="auth-wrap"><div className="auth-card">
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:8}}>
        <Logo s={300}/>
        {!LOGO_SRC&&<div style={{fontFamily:"'Orbitron',sans-serif",fontSize:26,fontWeight:700,letterSpacing:8,color:"var(--accent)",marginTop:10}}>DUSK</div>}
        <div className="tagline">Only the chosen enter</div>
      </div>
      {am==="login"&&<><div className="stitle">Sign In</div>
        <AuthField label="Email" type="email" value={af.email} onChange={e=>afc("email",e.target.value)} placeholder="your@email.com"/>
        <AuthField label="Password" type="password" value={af.pw} onChange={e=>afc("pw",e.target.value)} placeholder="••••••••" onEnter={login}/>
        <button className="btn btn-p btn-full" onClick={login} style={{marginBottom:14}}>Enter the Dark</button>
        <div style={{textAlign:"center",display:"flex",flexDirection:"column",gap:8}}>
          <button className="lbtn" onClick={()=>setAm("register")}>Have an invite code? Register</button>
          <button className="lbtn" onClick={()=>setAm("reset")}>Forgot password?</button>
          <button className="lbtn" onClick={()=>setAm("request")}>Request an invitation</button>
        </div></>}
      {am==="register"&&<><div className="stitle">Join Dusk</div>
        <AuthField label="Invite Code" value={af.code} onChange={e=>afc("code",e.target.value)} placeholder="DUSK-XXXX-XXXX"/>
        <AuthField label="Display Name" value={af.name} onChange={e=>afc("name",e.target.value)} placeholder="Your name"/>
        <AuthField label="Email" type="email" value={af.email} onChange={e=>afc("email",e.target.value)} placeholder="your@email.com"/>
        <AuthField label="Password" type="password" value={af.pw} onChange={e=>afc("pw",e.target.value)} placeholder="••••••••"/>
        <AuthField label="Confirm Password" type="password" value={af.confirm} onChange={e=>afc("confirm",e.target.value)} placeholder="••••••••" onEnter={register}/>
        <button className="btn btn-p btn-full" onClick={register} style={{marginBottom:10}}>Request Access</button>
        <div style={{textAlign:"center"}}><button className="lbtn" onClick={()=>setAm("login")}>← Back</button></div></>}
      {am==="request"&&<><div className="stitle">Request Invitation</div>
        <AuthField label="Email" type="email" value={af.email} onChange={e=>afc("email",e.target.value)} placeholder="your@email.com"/>
        <AuthField label="Why should you be chosen?" value={af.name} onChange={e=>afc("name",e.target.value)} placeholder="Tell us..."/>
        <button className="btn btn-p btn-full" onClick={reqInv} style={{marginBottom:10}}>Submit</button>
        <div style={{textAlign:"center"}}><button className="lbtn" onClick={()=>setAm("login")}>← Back</button></div></>}
      {am==="reset"&&<><div className="stitle">Reset Password</div>
        <AuthField label="Email" type="email" value={af.email} onChange={e=>afc("email",e.target.value)} placeholder="your@email.com" onEnter={resetPw}/>
        <button className="btn btn-p btn-full" onClick={resetPw} style={{marginBottom:10}}>Send Reset Email</button>
        <div style={{textAlign:"center"}}><button className="lbtn" onClick={()=>setAm("login")}>← Back</button></div></>}
    </div></div>
    <Toasts t={toasts}/></>);

  if(!cu.approved)return(<><style>{S}</style>
    <div className="auth-wrap"><div className="auth-card" style={{textAlign:"center"}}>
      <div style={{fontSize:40,marginBottom:16}}>🌑</div>
      <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:14,letterSpacing:2,color:"var(--accent)",marginBottom:12}}>Awaiting Approval</div>
      <p style={{fontSize:14,color:"var(--text2)",marginBottom:24}}>Your account is pending admin approval.</p>
      <button className="btn btn-g btn-full" onClick={logout}>Sign Out</button>
    </div></div>
    <Toasts t={toasts}/></>);

  const isAdmin=cu.role==="admin";
  const pendC=profiles.filter(p=>!p.approved).length;
  const full=["chat","dm"].includes(page);
  const IcoFeed=({on})=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on?"var(--accent)":"var(--text3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 10h16M4 14h10"/></svg>;
  const IcoChat=({on})=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on?"var(--accent)":"var(--text3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
  const IcoEvents=({on})=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on?"var(--accent)":"var(--text3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>;
  const IcoDM=({on})=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on?"var(--accent)":"var(--text3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  const IcoAdmin=({on})=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on?"var(--accent)":"var(--text3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>;
  const navs=[{id:"ann",Ico:IcoFeed,lbl:"Feed"},{id:"chat",Ico:IcoChat,lbl:"Chat"},{id:"events",Ico:IcoEvents,lbl:"Events"},{id:"dm",Ico:IcoDM,lbl:"Messages"},...(isAdmin?[{id:"admin",Ico:IcoAdmin,lbl:"Admin",badge:pendC}]:[])];
  const sp={cu,profiles,toast};

  return(<><style>{S}</style>
    <div className="shell">
      <div className="topbar">
        <span className="tb-brand">DUSK</span>
        <div className="tb-right">
          <button className="bell-btn" onClick={()=>{setShowN(!showN);setShowP(false);if(!showN)markRead();}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            {unread>0&&<span className="bell-count">{unread}</span>}
          </button>
          <div className={`av-ring${showP?" open":""}`} onClick={()=>{setShowP(!showP);setShowN(false);}}>
            <Av user={cu} size="sm"/>
          </div>
        </div>
      </div>
      <div className="content-area">
        <div className={full?"mcontent-full":"mcontent"}>
          {page==="ann"&&<Ann {...sp}/>}
          {page==="chat"&&<Chat {...sp}/>}
          {page==="events"&&<Events {...sp}/>}
          {page==="dm"&&<DM {...sp} initUser={dmInit}/>}
          {page==="profile"&&<Prof {...sp} userId={profId||cu.id} onMsg={u=>{setDmInit(u);setPage("dm");closeAll();}} onRefresh={refreshAll}/>}
          {page==="admin"&&isAdmin&&<Adm {...sp} onRefresh={refreshAll}/>}
        </div>
      </div>
      <div className="bottom-nav">
        {navs.map(item=>{const on=page===item.id;return(
          <button key={item.id} className={`nb${on?" on":""}`} onClick={()=>setPage(item.id)}>
            <div className="nb-ico" style={{position:"relative"}}><item.Ico on={on}/>{item.badge>0&&<span className="nb-dot"/>}</div>
            <span className="nb-lbl">{item.lbl}</span>
          </button>
        );})}
      </div>
    </div>

    {showN&&<><div className="overlay" onClick={()=>setShowN(false)}/><div className="dropdown dd-n">
      <div className="nhead"><span className="ntitle">Notifications</span><button className="lbtn" style={{fontSize:10}} onClick={clearNotifs}>Clear all</button></div>
      {notifs.length===0&&<div style={{padding:"16px 14px",fontSize:13,color:"var(--text3)"}}>No notifications</div>}
      {notifs.map(n=><div key={n.id} className={`nitem${n.read?"":" unread"}`}>{!n.read&&<span className="ndot"/>}{n.message}<div style={{fontSize:10,color:"var(--text3)",marginTop:2}}>{ago(n.created_at)} ago</div></div>)}
    </div></>}

    {showP&&<><div className="overlay" onClick={()=>setShowP(false)}/><div className="dropdown dd-p">
      <div className="pmenu-head"><Av user={cu} size="sm"/><div><div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{cu.name}</div><div style={{fontSize:10,color:"var(--text3)",textTransform:"uppercase",letterSpacing:1}}>{cu.role} · {cu.points||0}pt</div></div></div>
      <button className="pmenu-item" onClick={()=>{setProfId(cu.id);setPage("profile");closeAll();}}>👤  My Profile</button>
      <button className="pmenu-item" onClick={()=>{setPage("dm");closeAll();}}>✉️  Messages</button>
      <div style={{height:1,background:"var(--border)",margin:"3px 0"}}/>
      <button className="pmenu-item red" onClick={logout}>⎋  Sign Out</button>
    </div></>}

    <Toasts t={toasts}/>
  </>);
}
