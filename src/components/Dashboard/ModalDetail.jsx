import { useState } from "react";
import Modal from "../UI/Modal";
import classes from './ModalDetail.module.scss';

function ModalDetail({info, isModalVisible, onClose}) {

    // useState(false);

    const detail = <div>
        <ul className={classes['list']}>
            <li>
                <strong>BVN</strong>
                <span>{info.bvn || '-'}</span>
            </li>
            <li>
                <strong>Birth Date</strong>
                <span>{info.birthdate || '-'}</span>
            </li>
            <li>
                <strong>Email</strong>
                <span>{info.email || '-'}</span>
            </li>
            <li>
                <strong>Gender</strong>
                <span>{info.gender || '-'}</span>
            </li>
            <li>
                <strong>Marital Status</strong>
                <span>{info.marital_status || '-'}</span>
            </li>
            <li>
                <strong>State of Origin</strong>
                <span>{info.self_origin_state || '-'}</span>
            </li>
            <li>
                <strong>State of Origin L.G.A</strong>
                {info.self_origin_lga || '-'}
            </li>
            <li>
                <strong>Phone number 1</strong>
                {info.phoneNumber1 || '-'}
            </li>
            <li>
                <strong>Phone number 2</strong>
                {info.phoneNumber2 || '-'}
            </li>
        </ul>
    </div>

    return (
        <>
            <Modal
                infoDetail={detail}
                isInfoDetail={true}
                isModalVisible={isModalVisible}
                onCloseModal={onClose}
            />
        </>
    );
}

export default ModalDetail;