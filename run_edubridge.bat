@echo off
title EduBridge Server
echo ========================================================
echo Starting EduBridge Project Server...
echo Project: A STUDY ON DIGITAL EDUCATION AWARENESS IN RURAL VILLAGES
echo ========================================================
cd /d "%~dp0_legacy_backup"
node server.js
pause
