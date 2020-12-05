import { useEffect, useState } from 'react';
import { useStateGlobal } from '../../../utils/GlobalState';
import './Dashboard.css';

export default function Dashboard() {
  const [state] = useStateGlobal();
  const [borrower, setBorrower] = useState(0);
  useEffect(() => {
    document.title = 'Perpustakaan';
    if (state.member !== null) {
      const rs = state.member.filter((e) => {
        return e.borrowedBooks.books.length !== 0;
      });
      setBorrower(rs.length);
    }
  }, [state]);
  return (
    <section className='dashboard content'>
      <div>
        <div>
          <span>Total Buku</span>
          <span>{state.book !== null ? state.book.length : 0}</span>
        </div>
        <div>
          <span>Total Member</span>
          <span>{state.member !== null ? state.member.length : 0}</span>
        </div>
        <div>
          <span>Jumlah Peminjam</span>
          <span>{borrower}</span>
        </div>
      </div>
    </section>
  );
}
