import { Menu, Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { post } from '../lib/request'
import '../styles/global.css'

export default function App({ Component }) {

  return <div className="page-content">
      <Component />
    </div>
}