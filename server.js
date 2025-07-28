import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://cp.edgecontrol.net/public-api/resources/charge-points/v1.0', {
        headers: {
          Authorization: 'Bearer 5b616246-8aac-48a3-aae2-98f94494f669',
          'Content-Type': 'application/json'
        }
      });
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter(station => station.name.toLowerCase().includes(filter.toLowerCase()));
  const pricePerKW = 2.2;

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2 items-center">
        <Input placeholder="סנן לפי עיר או שם עמדת טעינה..." value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full max-w-sm" />
        <Button onClick={fetchData} disabled={loading}>{loading ? 'טוען...' : 'רענן'}</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((station) => {
          const totalKW = station.evses?.reduce((sum, evse) => sum + (evse.maxPower || 0), 0) / 1000;
          const totalRevenue = totalKW * pricePerKW;

          return (
            <Card key={station.id}>
              <CardContent className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{station.name}</h2>
                <p>IP: {station.networkIp}</p>
                <p>מספר שקעי טעינה: {station.evses?.length}</p>
                <p>סה"כ הספק (KW): {totalKW.toFixed(2)}</p>
                <p>הכנסה מוערכת (₪): {totalRevenue.toFixed(2)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
