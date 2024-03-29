import { Layout, Table } from 'antd';
import { Link } from 'react-router-dom';
import '../styles/passengerlist.css';

function PassengerList({ user, passengers, onDelete }) {
    const { Header, Footer, Content } = Layout;
    let today = new Date();

    function handleDelete(e) {
        let passengerId = e.target.getAttribute("info");
        fetch(`/passengers/${passengerId}`, {
            method: 'DELETE'
            })
        .then(onDelete(passengerId));
    }
   
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Cell',
            dataIndex: 'cell',
            key: 'cell',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        }
    ];
    
    const data = passengers.map((passenger, index) => {
        return {
            key: (index),
            name: `${passenger.legal_first_name} ${passenger.legal_last_name}`,
            position: passenger.position,
            department: passenger.department,
            cell: passenger.cell,
            email: passenger.email,
            action: <><Link to={`/passenger/${passenger.id}`}>View</Link><button className="passenger-delete" info={passenger.id} onClick={handleDelete}>Delete</button></>
        }
    })

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleTimeString(undefined, options)
    }

    return (
         <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                <div id="dashboard-header-content">
                    <p>{formatDate(today)}</p>
                    <p>Welcome, {user.first_name} {user.last_name}.</p>
                </div>
                </Header>
                <Content>
                    <div id="passenger-list">
                        <h1>Passengers</h1>
                        <Table
                                columns={columns}
                                dataSource={data}
                                size="small"
                                pagination={{ pageSize: 5, hideOnSinglePage: true }}
                            />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
    )
}

export default PassengerList;