export default function generateMapId(){
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234';
    let labelIndex = 0;
    return{
        getId:function(){
            return (labels[labelIndex++ % labels.length])
        }
    }
}