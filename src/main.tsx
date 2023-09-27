import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/index.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // https://tanstack.com/query/v3/docs/react/guides/query-retries
      refetchOnWindowFocus: false //default: true, //docs:  https://tanstack.com/query/v3/docs/react/guides/window-focus-refetching ==> thich hop dung cho cac trang chung khoan
      // staleTime: 10000 // default : 0, trong vong 5s ko call lai pai, het 5s call lai //docs:  https://tanstack.com/query/v3/docs/react/guides/caching
      // cacheTime: 0 // 0: muon cho no ko cho luu trong cache
    }
  }
})

// stateTime: di cho mua 1 quyen sach moi dc xem la du lieu moi
// cacheTime: sau 1 khoang 1 thang chẵng hạn, sach da doc r, du lieu dc xem la du lieu cu.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
