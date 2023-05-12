<template>
    <div>
        <button @click="playAudio">播放音訊</button>
        <audio id="audioPlayer" ref="audio"></audio>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const audioFile = ref("path/to/my/audio/file.mp3");
        const audioRef = ref(null);

        const playAudio = () => {
            const audioPlayer = document.getElementById("audioPlayer");
            audioPlayer.play();
        };

        onMounted(() => {
            audioRef.value.src = audioFile.value;
        });

        return { audioFile, audioRef, playAudio };
    }
}
</script>
  