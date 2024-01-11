<script setup lang="ts">
</script>

<template>
    <div class="background-container">
        <div class="info-container">
            <div class="text-parent-container top-container">
                <h2>Varför borde du använda vår tjänst?</h2>
                <ul>
                    <li><span>Smidigt - </span>Allt sammlat på ett ställe</li>
                    <li><span>Kostnadsfritt - </span>Tjänsten är helt gratis att använda</li>
                    <li><span>Ekonomiskt - </span>Du sparar pengar genom att välja det billigaste erbjudanet</li>
                </ul>
            </div>
            <div class="step-container">
                <div class="vertical-line"></div>

                <div class="text-containers">
                    <div class="text-child-containers">
                        <div class="text-parent-container">
                            <div class="text-container">
                                <fontAwesome :icon="['fas', 'user-plus']" style="color: #fff;" />            
                                <h2>1. Skapa ett konto</h2>
                                <p>Fyll i dina uppgifter för att skapa ett konto</p>
                                <RouterLink to="register" class="router-link">Skapa konto</RouterLink>
                            </div>
                        </div>

                        <div class="text-parent-container">
                            <div class="text-container">
                                <fontAwesome :icon="['fas', 'keyboard']" style="color: #fff;" />            
                                <h2>2. Kontakta verkstäder</h2>
                                <p>Skriv lite kort info om vad som är fel på bilen. Skicka sedan det till olika verkstäder</p>
                            </div>
                        </div>

                        <div class="text-parent-container">
                            <div class="text-container">
                                <fontAwesome :icon="['fas', 'message']" style="color: #fff;" />            
                                <h2>3. Få svar</h2>
                                <p>Sedan får du svar i din inkorg från olika verkstäder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    <img src="../../assets/img/stressedMan.jpg" class="stressed-man-img">

    <div class="promotion-container">
        <div class="text">
            <p>
                Vi vet alla hur jobbigt det kan vara att ringa runt till olika verkstäder för att se vart man kan spara mest pengar. 
            </p>
            <p>
                Därför har vi skapat denna tjänst där vi samlar alla verkstäder på ett ställe. Allt du behöver göra är att boka en felsökning eller beskriva vad som är fel på din bil. Du får sedan svar från olika verkstäder för att se vad dom kan erbjuda dig för pris. 
            </p>
        </div>
        <div class="interactive">
            <input type="text" placeholder="namn@domän.com">
            <button type="button" class="main-register-btn">Registrera</button>
        </div>
    </div>

    <div class="blue-line"></div>
</template>