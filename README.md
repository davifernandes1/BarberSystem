# 💈 Chill Barber - Aplicativo de Agendamento 📅

Este projeto é uma aplicação web simples e funcional, desenvolvida em **React** e **Vite**, para simular o sistema de agendamento de uma barbearia.

O design moderno é impulsionado pelo **Tailwind CSS**, utilizando uma paleta de cores inspirada em tons de bronze/âmbar para conferir um toque premium.

## 🎯 Objetivo do Projeto

O principal objetivo deste trabalho foi demonstrar o domínio de conceitos essenciais do desenvolvimento Frontend com React:

* **Estrutura de Múltiplas Páginas:** Implementação de navegação entre 3 telas principais.
* **Gerenciamento de Estado:** Uso intensivo de `useState` para controlar formulários e o estado da aplicação.
* **Persistência de Dados:** Garantia de que os agendamentos sejam salvos no navegador via `localStorage`.
* **Componentização:** Divisão da interface em componentes reutilizáveis (`Header`, `ServiceCard`, etc.).

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Framework** | **React** | Utilizando hooks (`useState`, `useEffect`) para o coração da lógica de agendamento. |
| **Estilização** | **Tailwind CSS** | Framework utility-first para um design responsivo e modular. |
| **Ambiente** | **Vite** | Utilizado como ferramenta de build para um desenvolvimento rápido. |
| **Tipografia** | **Roboto** | Fonte limpa e moderna para máxima legibilidade. |

---

## ✨ Funcionalidades em Destaque

### 1. Sistema de Agendamento (`AgendamentoPage.jsx`)

* **Formulário Controlado:** Todos os inputs (Nome, Barbeiro, Serviço) são vinculados ao estado do React para controle em tempo real.
* **Seleção de Barbeiro:** Escolha entre os três profissionais disponíveis (Jefferson, Gerson, Cleiton).
* **Validação Dinâmica de Horário:** Um modal de horários é exibido após a escolha da data, filtrando e desabilitando horários que já estão ocupados pelo barbeiro selecionado.

### 2. Painel de Visualização (`CalendarioPage.jsx`)

* **Visão Mensal da Ocupação:** Exibe todos os agendamentos salvos em um formato de calendário.
* **Checagem de Lotação:** Ao clicar em um dia, um modal detalhado mostra a ocupação por horário e quantos barbeiros ainda estão livres, fornecendo uma visão clara da capacidade da barbearia.

---

## 🚀 Como Iniciar o Projeto Localmente

Para rodar este aplicativo em seu ambiente de desenvolvimento, siga os passos abaixo:

1.  **Instale as dependências do projeto:**
    ```bash
    npm install
    # ou
    yarn install
    ```

2.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

O aplicativo será iniciado e você poderá acessá-lo em `http://localhost:5173` (ou a porta indicada pelo seu console).