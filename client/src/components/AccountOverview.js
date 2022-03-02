import { 
    Layout, 
    Card, 
    Table,
    Switch as Switching
} from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function AccountOverview({ trips, projects }) {
    const { Header, Footer, Content } = Layout;
    let upcomingFlights = [];
    const today = new Date();
    let tripsWithFlights = trips.filter(trip => trip.flights.length > 0)
    tripsWithFlights.forEach(trip => {
        trip.flights.sort((a,b) => {
            const distancea = Math.abs(today - Date.parse(a.dep_time));
            const distanceb = Math.abs(today - Date.parse(b.dep_time));
            return distancea - distanceb;
        })
    })
    tripsWithFlights.sort((a,b) => {
        const distancea = Math.abs(today - Date.parse(a.flights[0].dep_time));
        const distanceb = Math.abs(today - Date.parse(b.flights[0].dep_time));
        return distancea - distanceb;
    })
    if (tripsWithFlights.length > 0) {
        upcomingFlights = tripsWithFlights.filter(trip => {
            let differenceMs = (Date.parse(trip.flights[0].dep_time) - today) / (60 * 60 * 1000)
            return differenceMs <= 24 && differenceMs > 0
        })
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleTimeString(undefined, options)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
        },
        {
            title: 'Dates',
            dataIndex: 'dates',
            key: 'dates',
        },
        {
            title: 'Flight?',
            key: 'flight',
            dataIndex: 'flight',
        },
        {
            title: 'View',
            key: 'view',
            dataIndex: 'view'
        },
    ];

    const data = trips.map((trip, index) => {
        return {
            key: (index +1),
            name: `${trip.passenger.legal_first_name} ${trip.passenger.legal_last_name}`,
            project: `#${trip.project.job_no}`,
            dates: `${trip.depart} - ${trip.return}`,
            flight: (trip.flights.length > 0) ? <CheckOutlined /> : <div></div>,
            view: <Link to={`/trips/${trip.id}`}>View</Link>
        }
    })

   
    const project_columns = [
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
        },
        {
            title: 'Job Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }
    ];

    let activeProjects = projects.filter(project => project.active === true)
    const project_data = activeProjects.map((project, index) => {
        return {
            key: (index + 1),
            active: <Switching defaultChecked />,
            number: `#${project.job_no}`,
            client: project.client,
            name: `"${project.job_name}"`
        }
    })

    return (
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <div id="dashboard-header-content">
                    <p>{formatDate(today)}. Welcome, User.</p>
                </div>
            </Header>
            <Content style={{ margin: '16px 16px' }}>
                <div id="home-small-card-row">
                    <Card className="small-dash-card" title="Flights Within 24 Hours" style={{ width: 300 }}>
                        <div id="twentyfour-grid">
                            {upcomingFlights.map(trip => {
                                return (
                                    <div className="twentyfour-item" key={trip.id}>
                                        <Card>
                                            <p>{trip.passenger.legal_first_name} {trip.passenger.legal_last_name}</p>
                                            <p>{trip.flights[0].airline}</p>
                                            <p>Flight #{trip.flights[0].flight_no}</p>
                                            <p>Departs at {formatDate(trip.flights[0].dep_time)}</p>
                                            <p>Conf #: {trip.flights[0].confirmation}</p>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                    <Card className="small-dash-card" title="Projects" extra={<Link to='/projects'>View All</Link>} style={{ width: 300 }}>
                        <Table
                            columns={project_columns}
                            dataSource={project_data}
                            size="small"
                            pagination={{ pageSize: 5, hideOnSinglePage: true }}
                        />
                    </Card>
                </div>
                <div id="upcoming-travel" >
                    <Card title="Upcoming Travel" extra={<Link to='/trips'>View All</Link>} style={{ minHeight: 360 }}>
                        <Table 
                            columns={columns} 
                            dataSource={data} 
                            size="small"
                            pagination={{ pageSize: 10, hideOnSinglePage: true }}
                        />
                    </Card>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
        </Layout>
    )
}

export default AccountOverview;