@echo off
echo ========================================
echo   Fixing Storybook Installation
echo ========================================
echo.

echo [1/6] Uninstalling old Storybook packages...
call npm uninstall @storybook/react @storybook/react-vite storybook @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-onboarding @chromatic-com/storybook @storybook/addon-links @storybook/blocks @storybook/testing-library 2>nul

echo.
echo [2/6] Removing .storybook folder...
if exist .storybook rmdir /s /q .storybook

echo.
echo [3/6] Removing node_modules...
if exist node_modules rmdir /s /q node_modules

echo.
echo [4/6] Removing package-lock.json...
if exist package-lock.json del package-lock.json

echo.
echo [5/6] Installing dependencies...
call npm install

echo.
echo [6/6] Installing Storybook fresh...
call npx storybook@latest init --yes

echo.
echo ========================================
echo   Storybook Fix Complete!
echo ========================================
echo.
echo Now run: npm run storybook
echo.
pause
