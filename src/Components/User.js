import './User.css'
export default function User({ user, expanded, onClick }) {
    return (
        <div className='userCard'>
            <div className='userCardImg'>
                {/* <img alt='' src={user.img} /> add user img in backend  */}
            </div>
            <div className='userCardInfo'>
                <h3>{user.first_name} {user.last_name}</h3>
                <p><small>Joined: {new Date(user.joined_at).toLocaleDateString()}</small></p>
                {expanded && (
                    <div className='expandedInfo'>
                        <p>{user.email}</p>
                        <div>
                            <button className='action-button'>Chat</button>
                            <button className='action-button'>Change Role</button>
                            <button className='action-button'>Remove</button>
                        </div>
                    </div>
                )}
            </div>
            <div className='userCardButton'>
                <button onClick={onClick}>{expanded ? "-" : "+"} </button>
            </div>
        </div>
    )
}
