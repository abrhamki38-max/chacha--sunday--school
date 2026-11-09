# ጫጫ ቅዱስ ገብርኤል — Admin App

ይህ የመጀመሪያ የExpo/React Native ፕሮጀክት ነው። የተማሪ መመዝገብ፣ ወላጆችና መምህራን ዝርዝር፣ የዛሬ መገኘት፣ ክፍሎች እና መጽሐፍ ማዋስ መሠረታዊ ስራዎች አሉት።

## ማስነሳት
1. Node.js እና npm ይጫኑ።
2. `npm install`
3. `npx expo start`
4. Expo Go ወይም የሚደገፍ Snapp preview ይጠቀሙ።

## አስፈላጊ ገደቦች / ቀጣይ ስራ
- መረጃው በመሣሪያው AsyncStorage ውስጥ ብቻ ይቀመጣል፤ ብዙ አስተዳዳሪዎች በመሣሪያዎች መካከል ለመጋራት Supabase schema, Auth, RLS policies እና server functions ያስፈልጋሉ።
- የኢትዮጵያ ቀን አቆጣጠር እና ሙሉ የግእዝ ቁጥር ግቤት ማረጋገጫ እንዲጨመር ይፈልጋል። አሁን ያለው `toGeez` ረዳት ለቀላል ቁጥር ማሳያ ነው።
- ሙሉ የመታወቂያ ካርድ፣ የውጤት/ሮስተር ማስገባት፣ ፎልደር እና ሚዲያ ማከማቻ፣ የሚና-ተኮር ፍቃድ፣ 24 ሰዓት ማስታወሻዎች፣ SMS እና የራስ-ሰር ጥሪ በተለየ backend/provider ማዋቀር ይፈልጋሉ።
- ይህ የሚሰራ መነሻ ፕሮጀክት ነው፤ በዚህ አካባቢ Expo build እና በእውነተኛ ስልክ ሙከራ አልተደረገም። የProduction ስራ ከመጀመሩ በፊት ሙሉ ሙከራ ያድርጉ።


## የAndroid APK ማዘጋጀት
- መጀመሪያ `npm install` ያስኪዱ።
- EAS CLI ካልተጫነ `npm install -g eas-cli` ያስኪዱ።
- ከዚያ `eas login` እና `eas build:configure` ያድርጉ።
- የሙከራ APK: `npm run android:preview`
- የPlay Store AAB: `npm run android:production`

## በዚህ ዙር የተደረጉ ማሻሻያዎች
- የመገኘት ቀን በUTC ሳይሆን በስልኩ የአካባቢ ቀን እንዲሰላ ተስተካክሏል።
- የፈቃድ ምክንያት መጻፊያ በAndroid ላይም እንዲሰራ በገጹ ውስጥ ተጨምሯል።
- የመጽሐፍ መመለሻ ቀን በዝርዝሩ ላይ ይታያል።
- EAS የAndroid APK/AAB የbuild profiles ተጨምረዋል።

## የሙከራ ውጤት
በዚህ የስራ አካባቢ የnpm ጥቅሎችን መጫን በጊዜ ገደብ ምክንያት አልተጠናቀቀም፤ ስለዚህ Android APK አልተገነባም። የTypeScript/TSX ፋይሎች የsyntax transpile ምርመራ ግን ተሳክቷል። በእውነተኛ Expo build እና በAndroid ስልክ ላይ ሙሉ ሙከራ ከመደረጉ በፊት የሚሰራ መሆኑን 100% ማረጋገጥ አይቻልም።
