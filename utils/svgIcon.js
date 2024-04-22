'use client'

import React from "react";
import addImage from '../app/assets/icons/add-img.svg';
import addUser from '../app/assets/icons/add-user.svg';
import add from '../app/assets/icons/add.svg';
import appStore from '../app/assets/icons/appStore.svg';
import artStation from '../app/assets/icons/artStation.svg';
import behance from '../app/assets/icons/behance.svg';
import bitcoin from '../app/assets/icons/bitcoin.svg';
import box from '../app/assets/icons/box.svg';
import brand from '../app/assets/icons/brand.svg';
import calendar from '../app/assets/icons/calendar.svg';
import call from '../app/assets/icons/call.svg';
import check from '../app/assets/icons/check.svg';
import close from '../app/assets/icons/close.svg';
import code from '../app/assets/icons/code.svg';
import codeberg from '../app/assets/icons/codeberg.svg';
import copy from '../app/assets/icons/copy.svg';
import cashApp from '../app/assets/icons/Cash App.svg';
import diaspora from '../app/assets/icons/diaspora.svg';
import discord from '../app/assets/icons/discord.svg';
import documents from '../app/assets/icons/documents.svg';
import download from '../app/assets/icons/download.svg';
import drag from '../app/assets/icons/drag.svg';
import dribble from '../app/assets/icons/dribble.svg';
import ellipsis from '../app/assets/icons/ellipsis.svg';
import email from '../app/assets/icons/email.svg';
import facebook from '../app/assets/icons/facebook.svg';
import fax from '../app/assets/icons/fax.svg';
import featured from '../app/assets/icons/featured.svg';
import file from '../app/assets/icons/file.svg';
import friendica from '../app/assets/icons/friendica.svg';
import funkwhale from '../app/assets/icons/funkwhale.svg';
import github from '../app/assets/icons/github.svg';
import gitlab from '../app/assets/icons/gitlab.svg';
import google from '../app/assets/icons/google.svg';
import home from '../app/assets/icons/Home.svg';
import image from '../app/assets/icons/image.svg';
import instagram from '../app/assets/icons/instagram.svg';
import location from '../app/assets/icons/location.svg';
import line from '../app/assets/icons/Line.svg';
import linkedIn from '../app/assets/icons/linkedin.svg';
import key from '../app/assets/icons/key.svg';
import mastodon from '../app/assets/icons/mastodon.svg';
import matrix from '../app/assets/icons/matrix.svg';
import medium from '../app/assets/icons/medium.svg';
import messenger from '../app/assets/icons/messenger.svg';
import mobile from '../app/assets/icons/mobile.svg';
import monero from '../app/assets/icons/monero.svg';
import music from '../app/assets/icons/music.svg';
import office from '../app/assets/icons/office.svg';
import patreon from '../app/assets/icons/patreon.svg';
import pause from '../app/assets/icons/pause.svg';
import paypal from '../app/assets/icons/paypal.svg';
import peertube from '../app/assets/icons/peertube.svg';
import photo from '../app/assets/icons/photo.svg';
import pinterest from '../app/assets/icons/pinterest.svg';
import pixelfed from '../app/assets/icons/pixelfed.svg';
import play from '../app/assets/icons/play.svg';
import qrcode from '../app/assets/icons/qrcode.svg';
import quora from '../app/assets/icons/quora.svg';
import reddit from '../app/assets/icons/reddit.svg';
import review from '../app/assets/icons/Review.svg';
import share from '../app/assets/icons/share.svg';
import signal from '../app/assets/icons/Signal.svg';
import siilo from '../app/assets/icons/Siilo.svg';
import skype from '../app/assets/icons/Skype.svg';
import sms from '../app/assets/icons/SMS.svg';
import snapchat from '../app/assets/icons/snapchat.svg';
import soundcloud from '../app/assets/icons/soundcloud.svg';
import spotify from '../app/assets/icons/spotify.svg';
import stop from '../app/assets/icons/stop.svg';
import store from '../app/assets/icons/store.svg';
import telegram from '../app/assets/icons/telegram.svg';
import text from '../app/assets/icons/text.svg';
import tiktok from '../app/assets/icons/TikTok.svg';
import tumblr from '../app/assets/icons/tumblr.svg';
import twitch from '../app/assets/icons/twitch.svg';
import twitter from '../app/assets/icons/twitter.svg';
import upi from '../app/assets/icons/upi.svg';
import userPlus from '../app/assets/icons/user-plus.svg';
import viber from '../app/assets/icons/Viber.svg';
import videos from '../app/assets/icons/videos.svg';
import vimeo from '../app/assets/icons/vimeo.svg';
import vk from '../app/assets/icons/vk.svg';
import website from '../app/assets/icons/website.svg';
import weChat from '../app/assets/icons/WeChat.svg';
import whatsApp from '../app/assets/icons/whatsApp.svg';
import x from '../app/assets/icons/x.svg';
import yelp from '../app/assets/icons/yelp.svg';
import youtube from '../app/assets/icons/youtube.svg';
import openCollective from '../app/assets/icons/open-collective.svg';
import footerLogo from '../app/assets/icons/footer_logo.svg';
import footerLogo1 from '../app/assets/icons/footer_logo_1.svg';
import googleChat from '../app/assets/icons/googlechat-old.svg';
import buyMeACoffee from '../app/assets/icons/Buy me a coffee.svg';
import playStore from '../app/assets/icons/Play Store.svg';
import toast from "react-hot-toast";
// import whatsApp from '../app/assets/icons/whatsApp.svg';
// import whatsApp from '../app/assets/icons/whatsApp.svg';
// import whatsApp from '../app/assets/icons/whatsApp.svg';
// import whatsApp from '../app/assets/icons/whatsApp.svg';





const iconTypes = {
    addImage,
    addUser,
    add,
    appStore,
    artStation,
    behance,
    bitcoin,
    box,
    brand,
    calendar,
    call,
    check,
    close,
    code,
    codeberg,
    copy,
    diaspora,
    discord,
    documents,
    download,
    drag,
    dribble,
    ellipsis,
    email,
    facebook,
    fax,
    featured,
    file,
    friendica,
    funkwhale,
    github,
    gitlab,
    google,
    home,
    image,
    instagram,
    key,
    mastodon,
    matrix,
    medium,
    messenger,
    mobile,
    monero,
    music,
    office,
    patreon,
    pause,
    paypal,
    peertube,
    photo,
    pinterest,
    pixelfed,
    play,
    qrcode,
    quora,
    reddit,
    review,
    share,
    signal,
    siilo,
    skype,
    sms,
    snapchat,
    soundcloud,
    spotify,
    stop,
    store,
    telegram,
    text,
    tiktok,
    tumblr,
    twitch,
    twitter,
    upi,
    userPlus,
    viber,
    videos,
    vimeo,
    vk,
    website,
    weChat,
    whatsApp,
    x,
    yelp,
    youtube,
    openCollective,
    footerLogo,
    footerLogo1,
    googleChat,
    buyMeACoffee,
    playStore,
    location,
line,
linkedIn,
    cashApp
};

const IconComponent = ({ icon,style, ...props }) => {
    let stylen =  icon === 'website' || icon === 'paypal' || icon === 'gitlab' || icon === 'github' || icon === 'yelp' || icon === "patreon" ? null : { width: "20px", height: '20px' }
    let allStyles = { ...stylen, ...style }

    let Icon = iconTypes[icon];
    if(!Icon) return null
    return <Icon {...props} style={allStyles}/>;
};

export default IconComponent;