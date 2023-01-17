import classes from './DashBeneficiaries.module.scss';
// import DashDrawer from './DashDrawer';

function InfoItem({ field, value }) {
    return (
        <li className={classes['dashbeneficiary__info-item']}>
            <div>
                <span>{field}</span>
                <span>{value}</span>
            </div>
        </li>
    );
}

function BeneficiaryCard() {
    return (
        <div className={classes['dashbeneficiary__card']}>
            <div className={classes['dashbeneficiary__card-icon']}>
                <i className={`fas fa-ellipsis-h`} />
            </div>
            <div className={classes['dashbeneficiary__card-image']}><span /></div>
            <ul className={classes['dashbeneficiary__info']}>
                <InfoItem field={'Name'} value={'Tiaraoluwa Ogunjobi'} />
                <InfoItem field={'Date of Birth'} value={'1 March 2022'} />
                <InfoItem field={'School'} value={'Elbethel School'} />
                <InfoItem field={'Class'} value={'Basic 2'} />
            </ul>
        </div>
    );
}



function DashBeneficiaries() {
    return (
        <>
            <div className={classes['dashbeneficiaries']}>
                <BeneficiaryCard />
                <BeneficiaryCard />
                <BeneficiaryCard />
                <BeneficiaryCard />
                <BeneficiaryCard />
            </div>
            {/* <DashDrawer /> */}
            {/* <div className={classes['overlayy']} /> */}
        </>
    );
}

export default DashBeneficiaries;