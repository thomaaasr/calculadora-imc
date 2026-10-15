; Personalizações do instalador (NSIS), incluídas automaticamente pelo electron-builder.

; Ao clicar em "Cancelar", pergunta se deseja mesmo desistir da instalação (Sim/Não).
!define MUI_ABORTWARNING

; Texto da tela inicial.
!define MUI_WELCOMEPAGE_TITLE "Instalação da Calculadora IMC"
!define MUI_WELCOMEPAGE_TEXT "Este assistente vai instalar a Calculadora IMC no seu computador.$\r$\n$\r$\nClique em Instalar para continuar ou em Cancelar para desistir."

; Tela final: botão "Fechar" e caixinha (já marcada) para abrir o app ao fechar.
!define MUI_FINISHPAGE_BUTTON "Fechar"
!define MUI_FINISHPAGE_RUN_TEXT "Abrir a Calculadora IMC ao fechar"

; Instala apenas para o usuário atual, sem a tela "para quem instalar".
!macro customInstallMode
  StrCpy $isForceCurrentInstall "1"
!macroend

; Tela inicial, com o botão principal renomeado para "Instalar".
!macro customWelcomePage
  !define MUI_PAGE_CUSTOMFUNCTION_SHOW welcomePageShow
  !insertmacro MUI_PAGE_WELCOME

  Function welcomePageShow
    GetDlgItem $0 $HWNDPARENT 1
    SendMessage $0 ${WM_SETTEXT} 0 "STR:Instalar"
  FunctionEnd
!macroend
