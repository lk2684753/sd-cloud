import './index.less';
import { connect } from 'dva';
import { useRef, useState, useEffect } from 'react';
import Iconfont from '@/components/Iconfont';
import { Popover, Slider, Skeleton } from 'antd';
import Card from '@/components/Card';
import Space from '@/components/Space';
import axios from 'axios';
import { dataFormat, formatBytes } from '@/utils/filter/index';
import { useThrottleFn, useAsyncEffect, useUpdateEffect } from 'ahooks';
import { getCidUrl, sidToCid } from '@/utils/common';

interface Props {
  showCheck?: any;
  audioList: any;
  audioActiveIndex: number;
}

const AudioAction: React.FC<Props> = (props) => {
  const [playIndex, setPlayIndex] = useState(0);
  const [playItem, setPlayItem] = useState<any>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  useUpdateEffect(() => {
    setPlayIndex(props.audioActiveIndex);
    setAutoPlay(true);
    document.getElementById('globalAudio')?.setAttribute('src', '');
    setAudioIsPlay(false);
  }, [props.audioActiveIndex]);
  useEffect(() => {
    setPlayIndex(props.audioActiveIndex);
  }, [props.audioActiveIndex]);

  const [url, setUrl] = useState('');
  useEffect(() => {
    if (props.audioList && props.audioList.length !== 0 && playIndex !== -1) {
      if (!props.audioList[playIndex]) return;
      setPlayItem(props.audioList[playIndex]);
      let sid = props.audioList[playIndex].sid;
      let cid = sidToCid(sid);
      let newUrl = getCidUrl(cid,'');
      if (newUrl === url) {
        resetAudio();
      } else {
        setUrl(newUrl);
      }
    }
  }, [props.audioList, playIndex]);

  useEffect(() => {
    resetAudio();
  }, [url]);

  const [audioIsPlay, setAudioIsPlay] = useState(() => {
    return !!document.getElementById('globalAudio')?.getAttribute('src');
  });

  async function resetAudio() {
    if (audioIsPlay) {
      setDurationProcess(timeProcess(Math.floor(audio.duration)));
      updateProgress.run();
      audio.addEventListener('timeupdate', updateProgress.run, false);
      audio.addEventListener('ended', audioEnded, false);
      setPlay(!audio.paused);
      setPlayAudio({});
    } else {
      if (!url) return;
      document.getElementById('globalAudio')?.setAttribute('src', url);
      setAudioIsPlay(false);
      let tags = await getAudioTags();
      setPlayAudio(tags);
    }
  }

  function getAudioTags() {
    return new Promise((resolve, reject) => {
      let port = document.body.getAttribute('data-port');
      if (port) {
        //dist url change
        axios
          .post(`http://localhost:${port}/api/getAudioTags`, {
          // .post(`https://sdcloudstorage.on.fleek.co:${port}/api/getAudioTags`, {
            url: url,
          })
          .then((res: any) => {
            resolve(res.data);
          })
          .catch((error: any) => {
            reject(error);
          });
      } else {
        resolve({});
      }
    });
  }

  async function setPlayAudio(res: any) {
    let logoUrl = '';
    let user = res?.artist || '';
    if (res.picture) {
      const byteArray = new Uint8Array(res.picture.data);
      const blob = new Blob([byteArray], { type: res.picture.type });
      logoUrl = URL.createObjectURL(blob);
    }
    if (!playItem) return;
    let item = playItem;
    setInfo({
      logo: logoUrl || '',
      title: item.file_name,
      user: user,
      size: formatBytes(item.file_size, 2),
      createTime: dataFormat(item.created),
      sid: item.sid,
      url: url,
    });
    autoPlay && onPlay();
    setAutoPlay(false);
  }

  const [audio, setAudio] = useState<HTMLAudioElement>(() => {
    let audioDom: any = document.getElementById('globalAudio');
    return audioDom;
  });
  interface Info {
    logo: string;
    title: string;
    user: string;
    size: string;
    createTime: string;
    sid: string;
    url: string;
  }
  const [info, setInfo] = useState<Info>();
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeProcess, setCurrentTimeProcess] = useState('00:00');
  const [durationProcess, setDurationProcess] = useState('00:00');
  const [play, setPlay] = useState(false);
  const [volumeOld, setVolumeOld] = useState(100);
  useEffect(() => {
    if (!audioIsPlay) {
      audio.load();
      audio.oncanplay = () => {
        setDurationProcess(timeProcess(Math.floor(audio.duration)));
        audio.addEventListener('timeupdate', updateProgress.run, false);
        audio.addEventListener('ended', audioEnded, false);
      };
    }
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateProgress.run, false);
        audio.removeEventListener('ended', audioEnded, false);
      }
    };
  }, [audio]);
  function onSwitchPlay() {
    if (play) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlay(!play);
  }
  function onPlay() {
    audio.play();
    setPlay(true);
  }

  const updateProgress = useThrottleFn(
    () => {
      if (!audio) return;
      setCurrentTime(audio.currentTime);
      setCurrentTimeProcess(timeProcess(Math.floor(audio.currentTime)));
    },
    { wait: 500 },
  );
  function audioEnded() {
    audio.pause();
    setPlay(false);
  }
  function timeProcess(time: any) {
    let duration = parseInt(time, 10);
    let minute: any = parseInt((duration / 60).toString(), 10);
    let sec = (duration % 60).toString();
    if (minute === 0) {
      minute = '00';
    } else if (minute < 10) {
      minute = '0' + minute;
    }
    if (sec.length === 1) {
      sec = '0' + sec;
    }
    return minute + ':' + sec;
  }
  function onChangeProgress(val: number) {
    audio.currentTime = val;
    updateProgress.run();
  }

  const [volume, setVolume] = useState(audio.volume * 100);
  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);
  let volumeProgressRender = () => {
    return (
      <div className="audioValumeProgress">
        <Slider
          className="audioVolumeProgressVertical"
          min={0}
          max={100}
          step={1}
          tooltipVisible={false}
          defaultValue={volume}
          value={volume}
          vertical={true}
          onChange={onChangeVolume}
        />
      </div>
    );
  };

  function onChangeVolume(val: number) {
    setVolume(val);
    setVolumeOld(val);
  }
  function switchVolume() {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(volumeOld);
    }
  }
  function prevAudio() {
    let index = playIndex - 1;
    if (playIndex === 0) {
      index = props.audioList.length - 1;
    }
    setAutoPlay(true);
    setPlayIndex(index);
  }
  function nextAudio() {
    let index = playIndex + 1;
    if (playIndex === props.audioList.length - 1) {
      index = 0;
    }
    setAutoPlay(true);
    setPlayIndex(index);
  }
  function download() {
    let fileName = playItem.file_name;
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'content-type': 'audio/mpeg' },
    })
      .then((res: any) => {
        let blob = new Blob([res.data], { type: res.data.type });
        let downa = document.createElement('a');
        let href = window.URL.createObjectURL(blob);
        downa.href = href;
        downa.download = fileName;
        document.body.appendChild(downa);
        downa.click();
        document.body.removeChild(downa);
        window.URL.revokeObjectURL(href);
      })
      .catch((error: any) => {
        console.warn(error);
      });
  }

  function controlRender() {
    if (info) {
      return (
        <>
          <div className="titleBox">
            <div className="title">{info.title}</div>
            {info.user && <div className="user">- {info.user}</div>}
          </div>
          <div className="infoBox">
            <div>
              <div className="title">Size</div>
              <div className="value">{info.size}</div>
            </div>
            <div>
              <div className="title">Created Time:</div>
              <div className="value">{info.createTime}</div>
            </div>
            <div>
              <div className="title">SID：</div>
              <div className="value pointer" onClick={goCheck}>
                <Popover content={info.sid}>{info.sid.substr(0, 25) + '...'}</Popover>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <Skeleton paragraph={{ rows: 1 }} />;
    }
  }

  function goCheck() {
    props.showCheck(props.audioActiveIndex, props.audioList[props.audioActiveIndex]);
  }
  return (
    <div className="AudioControl">
      <div
        className="audioImage"
        style={{
          backgroundImage: `url(${info?.logo})`,
        }}
      ></div>
      <div className="controlBox">
        {controlRender()}
        <div className="actionBox">
          <div className="actionLeft">
            <Card
              borderAnimation
              radius={14}
              defaultBorder={false}
              background="linear-gradient(174deg, #111315 0%, rgb(44, 46, 53) 100%)"
            >
              <div className="left" onClick={prevAudio}>
                <Iconfont type="icon-shangyishou" size={16} />
              </div>
            </Card>
            <Space width={16} />
            <Card
              borderAnimation
              radius={18}
              defaultBorder={false}
              background="linear-gradient(174deg, #111315 0%, rgb(44, 46, 53) 100%)"
            >
              <div className="playAndStop" onClick={onSwitchPlay}>
                {play ? (
                  <Iconfont type="icon-zanting" size={20} />
                ) : (
                  <Iconfont type="icon-kaiqi" size={20} />
                )}
              </div>
            </Card>
            <Space width={16} />
            <Card
              borderAnimation
              radius={14}
              defaultBorder={false}
              background="linear-gradient(174deg, #111315 0%, rgb(44, 46, 53) 100%)"
            >
              <div className="right" onClick={nextAudio}>
                <Iconfont type="icon-xiayishou" size={16} />
              </div>
            </Card>
            <Popover
              content={volumeProgressRender()}
              overlayClassName="audioVolumePopover"
              trigger="hover"
            >
              <div className="volume" onClick={switchVolume}>
                {volume > 0 ? (
                  <Iconfont type="icon-yinliang" size={16} />
                ) : (
                  <Iconfont type="icon-jingyin" size={16} />
                )}
              </div>
            </Popover>
            <div className="download" onClick={download}>
              <Iconfont type="icon-xiazai1" size={16} />
            </div>
          </div>
          <div className="actionRight">
            {currentTimeProcess} / {durationProcess}
          </div>
        </div>
        <div className="progress">
          <Slider
            className="progress"
            min={0}
            max={Math.floor(audio?.duration || 0)}
            step={1}
            tooltipVisible={false}
            defaultValue={0}
            value={currentTime}
            vertical={false}
            onChange={onChangeProgress}
          />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  const { dispatch } = state.globalTop;
  const { audioList, audioActiveIndex } = state.menu;
  return {
    dispatch,
    audioList,
    audioActiveIndex,
  };
}
export default connect(mapStateToProps)(AudioAction);
