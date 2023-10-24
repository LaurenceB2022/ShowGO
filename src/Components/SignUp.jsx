import 'index.css';
import 'Components/SignUp.css';

const SignUp = () => {
    return(
        <div>
            <h1>Get Tickets To All Your Favorities</h1>
            <h2 className='subtext'>Or Maybe Something New...</h2>
            <br></br>
            <br></br>
            <br></br>
            <div>
                <label>Who Are You?</label>
                <span></span>
                <button>User</button>
                <span></span>
                <button>Venue</button>
                <br></br>

                <label>Display Name</label>
                <span></span>
                <input></input>
                <br></br>

                <label>Username</label>
                <span></span>
                <input></input>
                <br></br>

                <label>Password</label>
                <span></span>
                <input></input>
                {/* TODO
                    Custom data validation text (red / green dependent on requirement)
                */}
                <br></br>
                
                <button>SignUp</button>
            </div>
        </div>
    )
}
export default SignUp;