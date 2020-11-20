import React  from 'react';
import './Sidebar.scss';

function Sidebar() {
    return (
      <main className="layout">
        <section className="sidebar">
          <img
            className="sidebar--centered"
            src={require('../images/logo-white.png')}
            alt="Interview Scheduler"
            width="100px"
            height="100px"
          />
        </section>
    </main>
    );
}

export default Sidebar;