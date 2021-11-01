import React from 'react';
import FidelityComponent from '../../components/FidelityComponent/FidelityComponent';
import data from './data.json';

export default function FidelityPage() {
  return <FidelityComponent fidelityData={ data.fidelityTestData}/>;
}
